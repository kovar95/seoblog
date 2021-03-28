import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import ProfileUpdate from '../../components/auth/ProfileUpdate'
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

const UserProfileUpdate = () => {
  return (
    <Layout>
      <Private auth={isAuth()}>
      <Container fluid={true}>
          <Row>
            <ProfileUpdate/>
          </Row>
        </Container>
      </Private>
    </Layout>
  );
};

export default UserProfileUpdate;
