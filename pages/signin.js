import Layout from '../components/Layout';
import SigninComponent from '../components/auth/SigninComponent';
import {withRouter} from 'next/router'
import {Alert} from 'reactstrap'

const Signin = ({router}) => {

  const showRedirectMessage = () => {
    if (router.query.message) {
      return <Alert color='danger'>{router.query.message}</Alert>
    }
  }

  return (
    <Layout>
      <h2 color="primary" className="text-center pt-4 pb-4">
        Signin
      </h2>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          {showRedirectMessage()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Signin);
