import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
import { QuillModules, QuillFormats } from '../../helpers/quill';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Spinner,
  Badge,
  Container,
  Row,
  Col,
  Alert,
} from 'reactstrap';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>...</p>,
});
import '../../node_modules/react-quill/dist/quill.snow.css';

const BlogCreate = ({ router }) => {
  const blogFromLS = () => {
    if (typeof window === 'undefined') {
      return false;
    }

    if (localStorage.getItem('blog')) {
      return JSON.parse(localStorage.getItem('blog'));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [body, setBody] = useState(blogFromLS());
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false,
  });

  const {
    error,
    sizeError,
    success,
    formData,
    hidePublishButton,
    title,
  } = values;

  const token = getCookie('token');

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();
    // console.log('Ready to publish blog!');
    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: '',
          success: `A new blog titled "${data.title}" is created!`,
          title: '',
        });
        setBody('');
        setCheckedCategories([]);
        setCheckedTags([]);
      }
    });
  };

  const handleChange = (e) => {
    let { name, value, files } = e.target;
    let inputValue = name === 'photo' ? files[0] : value;
    formData.set(name, inputValue);
    setValues({ ...values, [name]: inputValue, formData, error: '' });
  };

  const handleBody = (e) => {
    // console.log(e)
    setBody(e);
    formData.set('body', e);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  const handleCategories = (categoryId) => {
    setValues({ ...values, error: '' });

    if (checkedCategories.some((catId) => catId === categoryId)) {
      formData.set(
        'categories',
        checkedCategories.filter((cId) => cId !== categoryId)
      );
      setCheckedCategories(
        checkedCategories.filter((cId) => cId !== categoryId)
      );
    } else {
      formData.set('categories', [...checkedCategories, categoryId]);
      setCheckedCategories([...checkedCategories, categoryId]);
    }

  };

  const handleTags = (tagId) => {
    setValues({ ...values, error: '' });

    if (checkedTags.some((tgId) => tgId === tagId)) {
      formData.set(
        'tags',
        checkedTags.filter((tId) => tId !== tagId)
      );
      setCheckedTags(checkedTags.filter((tId) => tId !== tagId));
    } else {
      formData.set('tags', [...checkedTags, tagId]);
      setCheckedTags([...checkedTags, tagId]);
    }
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c) => (
        <li key={c._id} className="list-unstyled m-1">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => handleCategories(c._id)}
          />
          <Badge color={c.color.toLowerCase()}>
            {c.name}
          </Badge>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t) => (
        <li  key={t._id} className="list-unstyled m-1">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => handleTags(t._id)}
          />
          <Badge color={t.color.toLowerCase()}>
            {t.name}
          </Badge>
        </li>
      ))
    );
  };

  const showError = () => error && <Alert color="danger">{error}</Alert>;

  const showSuccess = () => success && <Alert color="success">{success}</Alert>;

  const photoAdded = () => {
    return (
      formData &&
      formData.has('photo') &&
      `${formData.get('photo').name.substring(0, 24)}${
        formData.get('photo').name.length > 25 ? '...' : ''
      }`
    );
  };

  const createBlogForm = () => (
    <Form onSubmit={publishBlog}>
      <FormGroup>
        <Label className="text-muted" for="title">
          Title
        </Label>
        <Input
          onChange={handleChange}
          value={title}
          type="text"
          name="title"
          id="title"
          placeholder="Type the title of the blog!"
        />
      </FormGroup>
      <FormGroup>
        <Label className="text-muted">Content</Label>
        <ReactQuill
          value={body}
          placeholder="Write something amazing..."
          onChange={handleBody}
          modules={QuillModules}
          formats={QuillFormats}
        />
      </FormGroup>
      <FormGroup>
        <Button outline color="primary">
          Publish
        </Button>
      </FormGroup>
    </Form>
  );

  return (
    <Container fluid={true}>
      {formData}
      <Row>
        <Col md="8" className="pt-5 pb-5">
          {createBlogForm()}
          {showError()}
          {showSuccess()}
        </Col>
        <Col md="4">
          <div>
            <FormGroup className="pb-2">
              <h5>Featured image</h5>
              <hr />
              <small className="text-muted">Max-size: 1mb</small>
              <br />
              <Label
                className={`btn btn-outline-${
                  photoAdded() ? 'success' : 'info'
                }`}
              >
                {photoAdded() ? photoAdded() : 'Upload featured image'}
                {/* Upload featured image */}
                <Input
                  onChange={handleChange}
                  name="photo"
                  type="file"
                  accept="image/*"
                  hidden
                />
              </Label>
            </FormGroup>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {' '}
              {showTags()}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(BlogCreate);
