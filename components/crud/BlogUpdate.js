import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import { API } from '../../config';
import dynamic from 'next/dynamic';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { updateBlog, singleBlog } from '../../actions/blog';
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

const BlogUpdate = ({ router }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [body, setBody] = useState('');
  const [values, setValues] = useState({
    error: '',
    success: '',
    formData: '',
    title: '',
    updated: false,
  });

  const { error, success, formData, title, updated } = values;

  const token = getCookie('token');

  useEffect(() => {
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    singleBlog(router.query.slug).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, title: data.title, formData: new FormData() });
        setBody(data.body);
        setCategoriesArray(data.categories);
        setTagsArray(data.tags);
      }
    });
  };

  const setCategoriesArray = (blogCategories) => {
    let arr = [];
    blogCategories.map((cat) => arr.push(cat._id));
    setCheckedCategories(arr);
  };

  const setTagsArray = (blogTags) => {
    let arr = [];
    blogTags.map((tag) => arr.push(tag._id));
    setCheckedTags(arr);
  };

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

  const editBlog = (e) => {
    e.preventDefault();
    console.log(formData);
    // let formData = new FormData();
    // formData.set('title', title);
    // formData.set('body', body);
    updateBlog(formData, token, router.query.slug).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: '',
          success: `A blog titled "${values.title}" is updated!`,
          updated: true,
        });
        // Router.replace(`/admin`);
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
    setBody(e);
    formData.set('body', e);
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

    console.log(formData.get('tags'));
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
            checked={checkedCategories.some((cat) => cat == c._id)}
          />
          <Badge color={c.color.toLowerCase()}>{c.name}</Badge>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t) => (
        <li key={t._id} className="list-unstyled m-1">
          <input
            type="checkbox"
            className="mr-2"
            onChange={() => handleTags(t._id)}
            checked={checkedTags.some((tag) => tag == t._id)}
          />
          <Badge color={t.color.toLowerCase()}>{t.name}</Badge>
        </li>
      ))
    );
  };

  const adressToGo = () => {
    if (isAuth() && isAuth().role === 1) {
      return `/admin`;
    } else if (isAuth() && isAuth().role === 0) {
      return `/user`;
    }
  };

  const showError = () => error && <Alert color="danger">{error}</Alert>;

  const showSuccess = () =>
    success && (
      <Alert color="success">
        {success} | Go to{' '}
        <Link href={adressToGo()}>
          <a>Dashboard</a>
        </Link>
      </Alert>
    );

  const photoAdded = () => {
    return (
      formData &&
      formData.has('photo') &&
      `${formData.get('photo').name.substring(0, 24)}${
        formData.get('photo').name.length > 25 ? '...' : ''
      }`
    );
  };

  const updateBlogForm = () => (
    <Form onSubmit={editBlog}>
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
          Update
        </Button>
      </FormGroup>
    </Form>
  );

  return (
    <Fragment>
      {updated ? (
        showSuccess()
      ) : (
        <Container fluid={true}>
          <Row>
            <Col md="8" className="pt-5 pb-5">
              {updateBlogForm()}
              {/* {showSuccess()} */}
              {showError()}
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
                {body && (
                  <img
                    src={`${API}/blog/photo/${router.query.slug}`}
                    alt={values.title}
                    style={{
                      maxHeight: '150px',
                      width: 'auto',
                      marginBottom: '20px',
                    }}
                    className="img img-fluid"
                  />
                )}
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
      )}
    </Fragment>
  );
};

export default withRouter(BlogUpdate);
