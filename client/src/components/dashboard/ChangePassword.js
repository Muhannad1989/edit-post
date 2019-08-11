import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePassword } from './../../actions/auth';

const ChangePassword = ({ changePassword }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    password: '',
    password2: '',
  });

  const { currentPassword, password, password2 } = formData;

  const handelChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handelSubmit = e => {
    e.preventDefault();
    changePassword(currentPassword, password, password2);
    setFormData({
      currentPassword: '',
      password: '',
      password2: '',
    });
    return <Redirect to="/dashboard" />;
  };

  return (
    <Fragment>
      <h2 className="my-2">Change password</h2>
      <form className="form" onSubmit={e => handelSubmit(e)}>
        <div className="form-group">
          <input
            type="password"
            placeholder="Current password"
            name="currentPassword"
            value={currentPassword}
            onChange={e => handelChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="New Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => handelChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm New Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e => handelChange(e)}
            required
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Change" />
        <Link className="btn btn-primary" to="/dashboard">
          back to dashboard
        </Link>
      </form>
    </Fragment>
  );
};

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
};

export default connect(
  null,
  { changePassword },
)(ChangePassword);
