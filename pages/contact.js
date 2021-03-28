import Layout from '../components/Layout';
import Link from 'next/link';
import ContactForm from '../components/form/ContactForm';
import { Col, Container, Row } from 'reactstrap';

const Contact = () => {
  return (
    <Layout>
      <Container fluid={true}>
        <Row>
          <Col md="8" className="offset-md-2">
            <h2>Contact form</h2>
            <hr />
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Contact;
