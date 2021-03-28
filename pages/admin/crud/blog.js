import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogCreate from '../../../components/crud/BlogCreate';
import Link from 'next/link';
import { isAuth } from '../../../actions/auth';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

const Blog = () => {
  return (
    <Layout>
      <Admin auth={isAuth()}>
        <Container fluid={true}>
          <Row>
            <Col md="12" className="pt-5 pb-5">
              <h2>Create a new blog</h2>
            </Col>
            <Col md="12">
              <BlogCreate/>
            </Col>
          </Row>
        </Container>
      </Admin>
    </Layout>
  );
};

export default Blog;
