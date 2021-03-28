import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
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
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import Link from 'next/link';
import { isAuth } from '../../actions/auth';

const UserIndex = () => {
  return (
    <Layout>
      <Private auth={isAuth()}>
      <Container fluid={true}>
          <Row>
            <Col md="12" className="pt-5 pb-5">
              <h2>User Dashboard</h2>
            </Col>
            <Col md="6">
              <ListGroup>
              <ListGroupItem action>
                  <Link href="/user/update">
                    <a>Update profile</a>
                  </Link>
                </ListGroupItem>
                <ListGroupItem action>
                  <Link href="/user/crud/blog">
                    <a>Create blog</a>
                  </Link>
                </ListGroupItem>
                <ListGroupItem action>
                  <Link href="/user/crud/blogs">
                    <a>Update/Delete Blog</a>
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md="6">right</Col>
          </Row>
        </Container>
      </Private>
    </Layout>
  );
};

export default UserIndex;
