import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogUpdate from '../../../components/crud/BlogUpdate';
import Link from 'next/link';
import { isAuth } from '../../../actions/auth';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

const Blog = ({query}) => {
  return (
    <Layout>
      <Admin auth={isAuth()}>
        <Container fluid={true}>
          <Row>
            <Col md="12" className="pt-5 pb-5">
              <h2>Update blog</h2>
            </Col>
            <Col md="12">
              <BlogUpdate slug={query.slug} />
            </Col>
          </Row>
        </Container>
      </Admin>
    </Layout>
  );
};

export const getServerSideProps = async ({ query }) => {
  return {
    props: {
      query: query,
    },
  };
};

export default Blog;
