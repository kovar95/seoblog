import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { signup } from '../../../../actions/auth';
import { Button, Container } from 'reactstrap';

const ActivateAccount = ({ router }) => {
  const [values, setValues] = useState({
    name: '',
    error: '',
    token: '',
    loading: false,
    success: false,
    showButton: true,
  });

  const { name, error, token, loading, success, showButton } = values;

  useEffect(() => {
    let token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, [router]);

  const clickSumbit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    signup({ token }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          showButton: false,
          loading: false,
        });
      } else {
        setValues({
          ...values,
          loading: false,
          success: true,
          showButton: false,
        });
      }
    });
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : '');

  return (
      <Layout>
          <Container className="p-3">
              <h3 className="pb-4">Hey {name}, Ready to activate you account?</h3>
              {showLoading()}
              {error && error}
              {success && "You have successfully activated your account. Please signin."}
              {showButton && <Button onClick={clickSumbit} color="primary outline">Activate Account</Button>}
          </Container>
      </Layout>
  )




};

export default withRouter(ActivateAccount);
