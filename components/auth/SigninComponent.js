// import Router from 'next/dist/next-server/server/router';
import { Fragment, useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Spinner,
  Container,
} from 'reactstrap';
import { signin, authenticate, isAuth } from '../../actions/auth';

const SigninComponent = () => {
  console.log('This is signup component!');

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push('/');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //save user token to cookie

        //save user info to localstorage

        //authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push('/admin');
          } else {
            Router.push('/user');
          }
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : '';

  const signinForm = () => {
    return (
      <Form onSubmit={(e) => handleSubmit(e)}>
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
        <FormGroup className="text-center">
          {loading ? (
            <Spinner color="primary" />
          ) : (
            <Button outline color="primary">
              Sign in
            </Button>
          )}
        </FormGroup>
      </Form>
    );
  };

  return (
    <Container>
      {showError()}
      {showMessage()}
      <LoginGoogle/>
      {showForm && signinForm()}
      <br/>
      <Link href='/auth/password/forgot'>
        <a className="btn btn-outline-danger">Reset password</a>
      </Link>
    </Container>
  );
};

export default SigninComponent;
