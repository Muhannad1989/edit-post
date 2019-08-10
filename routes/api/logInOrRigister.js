const express = require('express');
// changed from 'express-validator/check' to be 'express-validator'
const User = require('../../models/User');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

const firebase = require('firebase');

router.post(
  '/social',

  async (request, response) => {
    // config settings
    firebase.initializeApp({
      apiKey: 'AIzaSyBzJx-uHixKqIsA8h8Dp91OS4Fasjdi8kk',
      authDomain: 'class20-b4669.firebaseapp.com',
    });

    // buttons
    //       uiConfig = {
    //         signInFlow: 'popup',
    //         signInOptions: [
    //           firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //           firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //           firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //           firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //           firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //         ],
    //         callbacks: {
    //           signInSuccess: () => false,
    //         },
    //     };

    //       firebase.auth().onAuthStateChanged(user => {
    // user
    //   }
    firebase.auth().signOut();
    firebase.auth().currentUser.displayName;

    // get the email or name from social network
    try {
      // check if the user exsist
      let user = await User.findOne({ email });

      if (user) {
        return response.status(404).json({ error: [{ message: 'User is already exsist' }] });
        // login with social network
      }

      // cond of generate avatar

      // create instance
      user = new User({
        name: user.displayName,
        email: user.email,
        avatar: firebase.auth().currentUser.photoURL,
      });

      // save name and email with out password
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      // console.log(payload);
      // kind of compiler for id to token
      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
        if (err) throw error;
        response.status(200).send({ token });
      });
    } catch (error) {
      // console.log(error.message)
      response.status(404).send('Server error');
    }
  },
);

module.exports = router;
