import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import BlogRead from '../../../components/crud/BlogRead';
import Link from 'next/link';
import { isAuth } from '../../../actions/auth';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

const Blogs = () => {

    const username = isAuth() && isAuth().username;

  return (
    <Layout>
      <Private auth={isAuth()}>
        <Container>
          <Row>
            <Col md="12" className="pt-5 pb-5">
              <h2>Manage blogs</h2>
            </Col>
            <Col md="12">
              <BlogRead username={username}/>
            </Col>
          </Row>
        </Container>
      </Private>
    </Layout>
  );
};

export default Blogs;
