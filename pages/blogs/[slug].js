import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import SmallCard from '../../components/blog/SmallCard';
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
import { Fragment, useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import DisqusThread from '../../components/DisqusThread'

const SingleBlog = ({ query, blog }) => {
  const {
    title,
    mdesc,
    slug,
    categories,
    tags,
    body,
    id,
    updatedAt,
    postedBy,
  } = blog;

  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated(blog).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, [query]);

  const head = () => (
    <Head>
      <title>
        {title} | {APP_NAME}
      </title>
      <meta name="description" content={mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:title" content={`${title} | ${APP_NAME}`} />
      <meta property="og:description" content={mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta property="og:image" content={`${API}/blog/photo/${slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/blog/photo/${slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const showBlogCategories = () => {
    return categories.map((c, i) => (
      <Link key={c._id} href={`/categories/${c.slug}`}>
        <a className={`btn btn-${c.color.toLowerCase()}  m-1  mt-3`}>
          {c.name}
        </a>
      </Link>
    ));
  };

  const showBlogTags = () => {
    return tags.map((t, i) => (
      <Link key={t._id} href={`/tags/${t.slug}`}>
        <a className={`btn btn-outline-${t.color.toLowerCase()}  m-1  mt-3`}>
          {t.name}
        </a>
      </Link>
    ));
  };

  const showRelatedBlogs = () => {
    return related.map((r, i) => (
      <Col md="4" key={i}>
        <article>
          <SmallCard blog={r} />
        </article>
      </Col>
    ));
  };

  const showComments = () => {
    return <div>
      <DisqusThread id={id} title={title} path={`/blog/${slug}`}  />
    </div>
  }

  return (
    <Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <Container fluid={true}>
              <section>
                <Row style={{ marginTop: '-30px' }}>
                  <img
                    src={`${API}/blog/photo/${slug}`}
                    alt={`${title}`}
                    className="img img-fluid featured-image"
                  />
                </Row>
              </section>
              <section>
                <Container>
                  <h1 className="display-3 pb-3 pt-3 text-center font-weight-bold">
                    {title}
                  </h1>
                  <p className="lead mt-3 mark">
                    Written by{' '}
                    <Link href={`/profile/${postedBy.username}`}>
                      <a>{postedBy.username}</a>
                    </Link>{' '}
                    | Published {moment(updatedAt).fromNow()}
                  </p>
                  <div className="pb-3">
                    {showBlogCategories()}
                    {showBlogTags()}
                  </div>
                </Container>
              </section>
            </Container>
            <Container>
              <section>
                <Col className="lead" md="12">
                  {renderHTML(body)}
                </Col>
              </section>
            </Container>
            <Container className="pb-5">
              <section>
                <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
                <hr />
                <Row>{showRelatedBlogs()}</Row>
              </section>
            </Container>
            <Container className="pb-5 pt-5">
              <section>
                {showComments()}
              </section>
            </Container>
          </article>
        </main>
      </Layout>
    </Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        props: {
          blog: data,
          query: query,
        },
      };
    }
  });
};

export default SingleBlog;
