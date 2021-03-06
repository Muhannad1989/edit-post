import React, { Component, Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { register2 } from '../../actions/auth';
import { connect } from 'react-redux';
// import { Dashboard } from './Dashboard';

firebase.initializeApp({
  apiKey: 'AIzaSyBzJx-uHixKqIsA8h8Dp91OS4Fasjdi8kk',
  authDomain: 'class20-b4669.firebaseapp.com',
});

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccess: () => false,
  },
};

const AnotherLogIn = ({ register2, auth: { loading } }) => {
  const [isSignedIn, setText] = useState(false);

  // const signOut = () => {
  //   setText({ isSignedIn: false }); // hook
  // };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // this.setState({ isSignedIn: !!user });
      setText({ isSignedIn: !!user }); // hook
      // register2(user.email, user.email);
      console.log({ email: user.email, name: user.displayName });
    });
  }, []);

  return (
    <div className="App">
      {isSignedIn ? (
        // <Dashboard  />
        <span>
          <div>Signed In!</div>
          <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          <img alt="profile picture" src={firebase.auth().currentUser.photoURL} />
        </span>
      ) : (
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      )}
    </div>
  );
};

AnotherLogIn.propTypes = {
  register2: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { register2 },
)(AnotherLogIn);
