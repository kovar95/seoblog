import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
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
import { Fragment, useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogSkip,
  blogsLimit,
  router,
}) => {
  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta
        name="description"
        content="Programming blogs and tutorials on react node express vue laravel php and web development"
      />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta
        property="og:title"
        content={`Latest web development tutorials | ${APP_NAME}`}
      />
      <meta
        property="og:description"
        content="Programming blogs and tutorials on react node express vue laravel php and web development"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />

      <meta
        property="og:image"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(blogSkip);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState(blogs);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button className="btn btn-outline-primary btn-lg" onClick={loadMore}>
          Load more
        </button>
      )
    );
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className={`btn btn-${c.color.toLowerCase()}  m-1  mt-3`}>
          {c.name}
        </a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className={`btn btn-outline-${t.color.toLowerCase()}  m-1  mt-3`}>
          {t.name}
        </a>
      </Link>
    ));
  };

  const showAllBlogs = () => {
    return loadedBlogs.map((blog) => (
      <article key={blog._id}>
        <Card blog={blog} />
        <hr />
      </article>
    ));
  };

  return (
    <Fragment>
      {head()}
      <Layout>
        <main>
          <Container fluid={true}>
            <header>
              <Col md="12" className="pt-3">
                <h1 className="display-4 font-weight-bold text-center">
                  Programing blogs and tutorials
                </h1>
              </Col>
              <section>
                <div className="pb-5 text-center">
                  {showAllCategories()}
                  <br />
                  {showAllTags()}
                </div>
              </section>
            </header>
          </Container>
          <Container fluid={true}>{showAllBlogs()}</Container>
          <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
        </main>
      </Layout>
    </Fragment>
  );
};

export const getServerSideProps = async () => {
  let skip = 0;
  let limit = 2;

  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        props: {
          blogs: data.blogs,
          categories: data.categories,
          tags: data.tags,
          totalBlogs: data.size,
          blogsLimit: limit,
          blogSkip: skip,
        },
      };
    }
  });
};

export default withRouter(Blogs); //getInitialProps
