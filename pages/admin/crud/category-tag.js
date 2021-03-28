import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';
import Link from 'next/link';
import { isAuth } from '../../../actions/auth';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

const CategoryTag = () => {
  return (
    <Layout>
      <Admin auth={isAuth()}>
        <Container fluid={true}>
          <Row>
            <Col md="12" className="pt-5 pb-5">
              <h2>Manage categories and tags</h2>
            </Col>
            <Col md="6">
              <Category/>
            </Col>
            <Col md="6">
                <Tag/>
            </Col>
          </Row>
        </Container>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
