import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/auth';
import AnotherLogIn from './AnotherLogIn';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handelChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handelSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  // check (logged) isAuthenticated to Redirect
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign In into your account
      </p>
      <form className="form" onSubmit={e => handelSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => handelChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => handelChange(e)}
            required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Login" />
        <label>Login with another account</label>
      </form>
      <button onClick={'change singin'} className="btn btn-danger">
        Another account
      </button>
      {/* <AnotherLogIn /> */}
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
      <p className="my-1">
        Forget your Password <Link to="/reset">Forget Password</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// use isAuthenticated to create redirect based on it
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { login },
)(Login);
