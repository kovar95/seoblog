import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import SmallCard from '../../components/blog/SmallCard';
import ContactForm from '../../components/form/ContactForm'
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
import { userPublicProfile } from '../../actions/user';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';
import { useRouter } from 'next/router';

const UserProfile = ({ user, blogs, query }) => {
  //   const {
  //     title,
  //     mdesc,
  //     slug,
  //     categories,
  //     tags,
  //     body,
  //     updatedAt,
  //     postedBy,
  //   } = blog;

  //   const { name } = postedBy;

  //   const [related, setRelated] = useState([]);

  //   const loadRelated = () => {
  //     listRelated(blog).then((data) => {
  //       if (data.error) {
  //         console.log(data.error);
  //       } else {
  //         setRelated(data);
  //       }
  //     });
  //   };

  //   useEffect(() => {
  //     loadRelated();
  //   }, [query]);

  const head = () => (
    <Head>
      <title>
        {user.username} | {APP_NAME}
      </title>
      <meta name="description" content={`Blogs by: ${user.username}`} />
      <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
      <meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
      <meta property="og:description" content={`Blogs by: ${user.username}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
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

  //   const showBlogCategories = () => {
  //     return categories.map((c, i) => (
  //       <Link key={c._id} href={`/categories/${c.slug}`}>
  //         <a className={`btn btn-${c.color.toLowerCase()}  m-1  mt-3`}>
  //           {c.name}
  //         </a>
  //       </Link>
  //     ));
  //   };

  //   const showBlogTags = () => {
  //     return tags.map((t, i) => (
  //       <Link key={t._id} href={`/tags/${t.slug}`}>
  //         <a className={`btn btn-outline-${t.color.toLowerCase()}  m-1  mt-3`}>
  //           {t.name}
  //         </a>
  //       </Link>
  //     ));
  //   };

  const showUserBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div className="mt-4 mb-4" key={i}>
          <Link href={`/blogs/${blog.slug}`}>
            <a className="lead">{blog.title}</a>
          </Link>
        </div>
      );
    });
  };

  return (
    <Fragment>
      {head()}
      <Layout>
        <Container>
          <Row>
            <Col md="12">
              <div className="card">
                <div className="card-body">
                  <Row>
                    <Col md="8">
                      <h5>{user.name}</h5>
                      <p className="text-mutted">
                        Joined {moment(user.createdAt).fromNow()}
                      </p>
                    </Col>
                    <Col md="4">
                      <img
                        src={`${API}/user/photo/${user._id}`}
                        alt="user profile"
                        className='img img-fluid img-thumbnail mb-3'
                        style={{maxHeight: '100px', maxWidth: '100%'}}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <br />

        <Container className="pb-5">
          <Row>
            <Col md="6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary p-4 text-light">
                    Recent blogs by {user.name}
                  </h5>
                  {showUserBlogs()}
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title bg-primary p-4 text-light">
                    Message {user.name}
                  </h5>
                  <br />
                  <ContactForm authorEmail={user.email}/>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
  console.log(query);
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        props: {
          user: data.user,
          blogs: data.blogs,
          query: query,
        },
      };
    }
  });
};

export default UserProfile;
