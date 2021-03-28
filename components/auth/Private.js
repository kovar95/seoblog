import { Fragment, useEffect } from 'react';
import Router from 'next/router';
import { isAuth } from '../../actions/auth';
import { Spinner } from 'reactstrap';

const Private = ({ children, auth }) => {
  useEffect(() => {
    if (!auth) {
      Router.push('/signin');
    }
  }, []);

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export default Private;
