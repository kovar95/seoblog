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

const SmallCard = ({ blog }) => {
  return (
    <div className="card mt-2 mb-2">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
              style={{ height: '250px', width: '100%' }}
              className="img img-fluid"
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h5 className="card-title">{blog.title}</h5>
            </a>
          </Link>
          <div className="card-text">{renderHTML(blog.excerpt)}</div>
        </section>
      </div>

      <div className="card-body">
        Posted {moment(blog.createdAt).fromNow()} by{' '}
        <Link href={`/profile/${blog.postedBy.username}`}>
          <a>{blog.postedBy.username}</a>
        </Link>
      </div>
    </div>
  );
};

export default SmallCard;
