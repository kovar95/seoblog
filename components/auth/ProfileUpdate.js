import { Fragment, useEffect, useState } from 'react';
import Router from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { API } from '../../config';
import { isAuth, getCookie, updateUser } from '../../actions/auth';
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

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    about: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    userData: process.browser && new FormData(),
    id: '',
  });

  const token = getCookie('token');
  const {
    username,
    name,
    email,
    about,
    password,
    error,
    success,
    loading,
    photo,
    userData,
    id,
  } = values;

  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          id: data._id,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    });
  };

  useEffect(() => {
    init();
    setValues({ ...values, userData: new FormData() });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    // console.log('Ready to publish blog!');
    updateProfile(token, userData).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            username: data.username,
            name: data.name,
            email: data.email,
            about: data.about,
            password: '',
            success: true,
            loading: false,
          });
        });
      }
    });
  };

  const handleChange = (e) => {
    let { name, value, files } = e.target;
    let inputValue = name === 'photo' ? files[0] : value;
    userData.set(name, inputValue);
    setValues({
      ...values,
      [name]: inputValue,
      userData,
      error: false,
      success: false,
    });
  };

  const profileUpdateForm = () => (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="pb-2 text-muted">
        <p>Profile photo</p>
        <small className="text-muted">Max-size: 1mb</small>
        <br />
        <Label className={`btn btn-outline-${false ? 'success' : 'info'}`}>
          {/* {photoAdded() ? photoAdded() : 'Upload featured image'} */}
          Upload profile image
          <Input
            onChange={handleChange}
            name="photo"
            type="file"
            accept="image/*"
            hidden
          />
        </Label>
      </FormGroup>
      {/* <FormGroup>
        <Label className="text-muted" for="title">
          Profile photo
        </Label>
        <Input
          onChange={handleChange}
          type="file"
          name="photo"
          id="photo"
          accept='image/*'
        />
      </FormGroup> */}
      <FormGroup>
        <Label className="text-muted">Username</Label>
        <Input
          onChange={handleChange}
          value={username}
          type="text"
          name="username"
          id="username"
        />
      </FormGroup>
      <FormGroup>
        <Label className="text-muted">Name</Label>
        <Input
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          id="name"
        />
      </FormGroup>
      <FormGroup>
        <Label className="text-muted">Email</Label>
        <Input
          onChange={handleChange}
          value={email}
          type="text"
          name="email"
          id="email"
        />
      </FormGroup>
      <FormGroup>
        <Label className="text-muted">About</Label>
        <Input
          onChange={handleChange}
          value={about}
          type="textarea"
          name="about"
          id="about"
        />
      </FormGroup>
      <FormGroup>
        <Label className="text-muted">Password</Label>
        <Input
          onChange={handleChange}
          value={password}
          type="password"
          name="password"
          id="password"
        />
      </FormGroup>
      <FormGroup>
        {loading ? (
          <Spinner color="primary" />
        ) : (
          <Button outline color="primary">
            Update
          </Button>
        )}
      </FormGroup>
    </Form>
  );

  const showError = () => (error ? <Alert color="danger">{error}</Alert> : '');
  const showSuccess = () =>
    success ? <Alert color="success">Profile updated</Alert> : '';

  return (
    <Fragment>
      <Container>
        <Row className="mt-1">
          <Col md="4">
            <img src={`${API}/user/photo/${id}`}
            className='img img-fluid img-thumbnail mb-3'
            style={{maxHeight: 'auto', maxWidth: '100%'}}
            alt='user profile' />{' '}
          </Col>
          <Col md="8" className="mb-5">
            {profileUpdateForm()}
            {showSuccess()}
            {showError()}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ProfileUpdate;
