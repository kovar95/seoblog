import Layout from '../components/Layout';
import Link from 'next/link';
import SignupComponent from '../components/auth/SignupComponent'

const Signup = () => {
  return (
    <Layout>
      <h2 color='primary' className='text-center pt-4 pb-4'>Signup</h2>
      <div className="row">
        <div className="col-md-4 offset-md-4">
        <SignupComponent/>
        </div>
      </div>
      
    </Layout>
  );
};

export default Signup;
