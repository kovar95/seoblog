import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogRead from '../../../components/crud/BlogRead';
import Link from 'next/link';
import { isAuth } from '../../../actions/auth';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

const Blogs = () => {
  return (
    <Layout>
      <Admin auth={isAuth()}>
        <Container>
          <Row>
            <Col md="12" className="pt-5 pb-5">
              <h2>Manage blogs</h2>
            </Col>
            <Col md="12">
              <BlogRead/>
            </Col>
          </Row>
        </Container>
      </Admin>
    </Layout>
  );
};

export default Blogs;
