import { Fragment, useState } from 'react';
import Link from 'next/link';
import { emailContactForm } from '../../actions/form';

const ContactForm = ({authorEmail}) => {
  const [values, setValues] = useState({
    message: '',
    name: '',
    email: '',
    sent: false,
    buttonText: 'Send Message',
    success: false,
    error: false,
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: 'Sending...' });
    emailContactForm({authorEmail, name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          sent: true,
          name: '',
          email: '',
          message: '',
          buttonText: 'Sent',
          success: data.success,
        });
      }
    });
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
      error: false,
      success: false,
      buttonText: 'Send Message',
    });
  };

  const showSuccessMessage = () =>
    success && (
      <div className="alert alert-info">Thank you for contacting us!</div>
    );

  const showErrorMessage = () =>
    error && <div className="alert alert-info">{error}</div>;

  const contactForm = () => {
    return (
      <form onSubmit={clickSubmit} className="pb-5">
        <div className="form-group">
          <label className="lead">Message</label>
          <textarea
            name="message"
            onChange={handleChange}
            rows="10"
            type="text"
            className="form-control"
            value={message}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label className="lead">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="form-control"
            value={name}
            required
          />
        </div>

        <div className="form-group">
          <label className="lead">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="form-control"
            value={email}
            required
          />
        </div>

        <div>
          <button className="btn btn-primary">{buttonText}</button>
        </div>
      </form>
    );
  };

  return (
    <Fragment>
      {showSuccessMessage()}
      {showErrorMessage()}
      {contactForm()}
    </Fragment>
  );
};

export default ContactForm;
