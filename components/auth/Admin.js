import { Fragment, useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';
import { Spinner } from 'reactstrap';

const Admin = ({ children, auth }) => {
  useEffect(() => {
    if (!auth) {
      Router.push('/signin');
    } else if (auth.role !== 1) {
      Router.push('/');
    }
  }, []);
  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default Admin;
