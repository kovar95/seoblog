import { useState } from 'react';
import Layout from '../../../components/Layout';
import { forgotPassword } from '../../../actions/auth';
import { Alert, Button, Container, FormGroup, Input } from 'reactstrap';

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
    message: '',
    error: '',
    showForm: true,
  });

  const { email, message, error, showForm } = values;

  const handleChange = (e) => {
    setValues({
      ...values,
      error: '',
      message: '',
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, message: '', error: '' });

    forgotPassword(email).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          message: `Email has been sent to ${email}. Follow instructions to reset your password. Link expires in 10min.`,
          email: '',
          showForm: false,
        });
      }
    });
  };

  const showError = () => (error ? <Alert color="danger">{error}</Alert> : '');
  const showMessage = () =>
    message ? <Alert color="success">{message}</Alert> : '';

  const passwordForgotForm = () => (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormGroup className="pt-5">
          <Input
            onChange={handleChange}
            value={email}
            type="email"
            name="email"
            id="email"
            placeholder="Type your email"
            required
          />
        </FormGroup>
        <FormGroup>
          <Button color="primary">Send password reset link</Button>
        </FormGroup>
      </form>
    </Container>
  );

  return (
    <Layout>
      <Container className='pt-5'>
        <h2>Forgot password</h2>
        <hr />
        {showError()}
        {showMessage()}
        {showForm && passwordForgotForm()}
      </Container>
    </Layout>
  );
};

export default ForgotPassword;
