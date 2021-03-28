import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
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
import moment from 'moment';

const BlogRead = ({username}) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const token = getCookie('token');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list(username).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteBlog = (slug) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you want to delete this blog?');
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = (blog) => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog.slug}`}>
          <Button className="btn-sm m-1" color='warning'>Update</Button>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <Button className="btn-sm m-1" color='warning'>Update</Button>
        </Link>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className="pb-5">
          <h3>{blog.title}</h3>
          <p className="mark">
            Written by {blog.postedBy.name} | Published{' '}
            {moment(blog.updatedAt).fromNow()}
          </p>
          <Button
            color="danger"
            className="btn-sm m-1"
            onClick={() => deleteConfirm(blog.slug)}
          >
            Delete
          </Button>
          {showUpdateButton(blog)}
        </div>
      );
    });
  };

  return (
    <Fragment>
      <Row>
        <Col md="12">
          {message && <Alert color="warning">{message}</Alert>}
          {showAllBlogs()}
        </Col>
      </Row>
    </Fragment>
  );
};

export default BlogRead;
