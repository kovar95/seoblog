import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';
import Link from 'next/link';
import { isAuth } from '../../actions/auth';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import Router from 'next/router';

const AdminIndex = () => {
  return (
    <Layout>
      <Admin auth={isAuth()}>
        <Container fluid={true}>
          <Row>
            <Col md="12" className="pt-5 pb-5">
              <h2>Admin Dashboard</h2>
            </Col>
            <Col md="6">
              <ListGroup>
                <ListGroupItem action>
                  <Link href="/admin/crud/category-tag">
                    <a>Create category</a>
                  </Link>
                </ListGroupItem>
                <ListGroupItem action>
                  <Link href="/admin/crud/category-tag">
                    <a>Create tag</a>
                  </Link>
                </ListGroupItem>
                <ListGroupItem action>
                  <Link href="/admin/crud/blog">
                    <a>Create blog</a>
                  </Link>
                </ListGroupItem>
                <ListGroupItem action>
                  <Link href="/admin/crud/blogs">
                    <a>Update/Delete Blog</a>
                  </Link>
                </ListGroupItem>
                <ListGroupItem action>
                  <Link href="/user/update">
                    <a>Update Profile</a>
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md="6">right</Col>
          </Row>
        </Container>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
