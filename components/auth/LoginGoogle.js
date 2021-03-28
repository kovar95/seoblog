import { Fragment, useEffect, useState } from 'react';
import Router from 'next/router';
import { GOOGLE_CLIENT_ID } from '../../config';
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth';
import GoogleLogin from 'react-google-login';
import { getProfile, updateProfile } from '../../actions/user';
import {
  Container,
  Row,
  Col,
  Spinner,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert,
} from 'reactstrap';

const LoginGoogle = () => {
  const responseGoogle = (response) => {
    // console.log(response);
    const tokenId = response.tokenId;
    const user = {tokenId};

    loginWithGoogle(user).then(data => {
        if (data.error) {
            console.log(error)
        } else {
            authenticate(data, () => {
                if (isAuth() && isAuth().role === 1) {
                  Router.push('/admin');
                } else {
                  Router.push('/user');
                }
              });
        }
    })
  };

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login with google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="dark"
      />
    </div>
  );
};

export default LoginGoogle;
