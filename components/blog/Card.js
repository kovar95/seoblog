import Head from 'next/head';
import Link from 'next/link';
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
  Jumbotron,
} from 'reactstrap';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const Card = ({ blog }) => {
  const showBlogCategories = () => {
    return blog.categories.map((c, i) => (
      <Link key={c._id} href={`/categories/${c.slug}`}>
        <a className={`btn btn-${c.color.toLowerCase()}  m-1  mt-3`}>
          {c.name}
        </a>
      </Link>
    ));
  };

  const showBlogTags = () => {
    return blog.tags.map((t, i) => (
      <Link key={t._id} href={`/tags/${t.slug}`}>
        <a className={`btn btn-outline-${t.color.toLowerCase()}  m-1  mt-3`}>
          {t.name}
        </a>
      </Link>
    ));
  };

  return (
    <Jumbotron className="lead pb-4">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <Alert color="secondary">
          {/* className="mark ml-1 pt-2 pb-2" p */}
          Written by{' '}
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a>{blog.postedBy.username}</a>
          </Link>{' '}
          | Published {moment(blog.updatedAt).fromNow()}
        </Alert>
      </section>
      <section>
        {showBlogCategories()}
        {showBlogTags()}
        <br />
        <br />
      </section>
      <Row>
        <Col md="4">
          <section>
            <img
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
              style={{ maxHeight: 'auto', width: '100%' }}
              className="img img-fluid"
            />
          </section>
        </Col>
        <Col md="8">
          <section>
            <div className="pb-3">{renderHTML(blog.excerpt)}</div>

            <Link href={`/blogs/${blog.slug}`}>
              <a className="btn btn-primary pt-2">Read more</a>
            </Link>
          </section>
        </Col>
      </Row>
    </Jumbotron>
  );
};

export default Card;
