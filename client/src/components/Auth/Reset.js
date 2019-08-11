import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reset } from '../../actions/auth';
import PropTypes from 'prop-types';

// register component
const Reset = ({ reset }) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const handelChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handelSubmit = e => {
    e.preventDefault();
    reset(email);
    setFormData({ email: '' });
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Reset Password</h1>
      <p className="lead">Write your email to reset password</p>
      <form className="form" onSubmit={e => handelSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Insert your email"
            name="email"
            // minLength="6"
            value={email}
            onChange={e => handelChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
      <p className="my-1">
        Back to <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Reset.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default connect(
  null,
  { reset },
)(Reset);
