import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import Card from '../../components/blog/Card';
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
import { singleTag } from '../../actions/tag';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';

const Tag = ({ tag: {name, slug}, blogs }) => {

    const head = () => (
        <Head>
          <title>
            {name} | {APP_NAME}
          </title>
          <meta name="description" content={`${name} - Best practice`} />
          <link rel="canonical" href={`${DOMAIN}/tags/${slug}`} />
          <meta property="og:title" content={`${name} blogs | ${APP_NAME}`} />
          <meta property="og:description" content={`${name} - Best practice`} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${DOMAIN}/tags/${slug}`} />
          <meta property="og:site_name" content={`${APP_NAME}`} />
    
          <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
          <meta
            property="og:image:secure_url"
            content={`${DOMAIN}/static/images/seoblog.jpg`}
          />
          <meta property="og:image:type" content="image/jpg" />
          <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
      );

  return (
    <Fragment>
        {head()}
      <Layout>
        <main>
          <Container fluid={true} className="text-center">
            <header>
              <Col md="12" className="pt-3">
                <h1 className="display-4 font-weight-bold">{name}</h1>
                {blogs.map((b, i) => (
                  <div key={i}>
                    <Card blog={b} />
                    <hr />
                  </div>
                ))}
              </Col>
            </header>
          </Container>
        </main>
      </Layout>
    </Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
  return singleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        props: {
          tag: data.tag,
          blogs: data.blogs,
        },
      };
    }
  });
};

export default Tag;
