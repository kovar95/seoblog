import { Fragment, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Spinner  } from 'reactstrap';
import { signup, isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router'

const SignupComponent = () => {
  console.log('This is signup component!');

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push('/');
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    preSignup(user).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <Spinner color="primary" /> : '';
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : '';

  const signupForm = () => {
    return (
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            onChange={handleChange}
            value={name}
            type="text"
            name="name"
            id="name"
            placeholder="Type your name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            onChange={handleChange}
            value={email}
            type="email"
            name="email"
            id="email"
            placeholder="Type your email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            onChange={handleChange}
            value={password}
            type="password"
            name="password"
            id="password"
            placeholder="Type a password"
          />
        </FormGroup>
        <Button outline color='primary'>Sign up</Button>
      </Form>
    );
  };

  return (
    <Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </Fragment>
  );
};

export default SignupComponent;
