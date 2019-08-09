import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getPost } from '../../actions/post';
import './style.css';

// add history to redirect to posts when something wrong
const SendForm = () => {
  // useEffect(() => {
  //   getPost('');
  // }, [getPost]);

  return (
    <Fragment>
      <div class="container">
        <h1 class="brand">
          <span>Acme</span> Web Design
        </h1>
        <div class="wrapper animated bounceInLeft">
          <div class="company-info">
            <h3>Acme Web Design</h3>
            <ul>
              <li>
                <i class="fa fa-road" /> 44 Something st
              </li>
              <li>
                <i class="fa fa-phone" /> (555) 555-5555
              </li>
              <li>
                <i class="fa fa-envelope" /> test@acme.test
              </li>
            </ul>
          </div>
          <div class="contact">
            <h3>Email Us</h3>
            <form method="POST" onSubmit={''} /*action="send"*/>
              <p>
                <label>Name</label>
                <input type="text" name="name" />
              </p>
              <p>
                <label>Company</label>
                <input type="text" name="company" />
              </p>
              <p>
                <label>Email Address</label>
                <input type="email" name="email" />
              </p>
              <p>
                <label>Phone Number</label>
                <input type="text" name="phone" />
              </p>
              <p class="full">
                <label>Message</label>
                <textarea name="message" rows="5" />
              </p>
              <p class="full">
                <button type="submit">Submit</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SendForm.propTypes = {
  // getPost: PropTypes.func.isRequired,
  // post: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  // auth: state.auth,
});
export default connect(
  mapStateToProps,
  {},
)(SendForm);
