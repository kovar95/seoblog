import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import BlogCreate from '../../../components/crud/BlogCreate';
import Link from 'next/link';
import { isAuth } from '../../../actions/auth';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

const CreateBlog = () => {
  return (
    <Layout>
      <Private auth={isAuth()}>
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
      </Private>
    </Layout>
  );
};

export default CreateBlog;
