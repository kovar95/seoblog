import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { resetPassword } from '../../../../actions/auth';
import {Alert, Container, FormGroup, Input, Button} from 'reactstrap'

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    newPassword: '',
    error: '',
    message: '',
    showForm: true,
  });

  const { showForm, newPassword, error, message } = values;

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

    resetPassword({ newPassword, resetPasswordLink: router.query.id }).then(
      (data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            showForm: false,
            newPassword: '',
          });
        } else {
          setValues({
            ...values,
            message: data.message,
            showForm: false,
            newPassword: '',
            error: false,
          });
        }
      }
    );
  };

  const showError = () => (error ? <Alert color="danger">{error}</Alert> : '');
  const showMessage = () =>
    message ? <Alert color="success">{message}</Alert> : '';

  const passwordResetForm = () => (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormGroup className="pt-5">
          <Input
            onChange={handleChange}
            value={newPassword}
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="Type new password"
            required
          />
        </FormGroup>
        <FormGroup>
          <Button color="primary">Change password</Button>
        </FormGroup>
      </form>
    </Container>
  );

  return (
    <Layout>
      <Container className="pt-5" fluid={true}>
        <h2>Forgot password</h2>
        <hr />
        {showError()}
        {showMessage()}
        {showForm && passwordResetForm()}
      </Container>
    </Layout>
  );
};

export default withRouter(ResetPassword);