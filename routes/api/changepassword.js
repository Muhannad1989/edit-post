const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// @route           PUT api/user/change
// @description     Change password post
// @access          Private
router.put(
  '/',
  [
    auth,
    [
      check('currentpassword', 'Please enter a password with 6 or more characters ').isLength({
        min: 6,
      }),
      check('password', 'Please enter a password with 6 or more characters ').isLength({ min: 6 }),
      check('password2', 'Please enter a password with 6 or more characters ').isLength({ min: 6 }),
    ],
  ],
  async (request, response) => {
    const { currentpassword, password, password2 } = request.body;
    const errors = validationResult(request);
    // if they are errors
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    // check password
    if (password !== password2) {
      return response.send('passwords not match');
    }

    try {
      let user = await User.findOne({ _id: request.user.id });

      // check if the user exsist
      if (!user) {
        return response.status(404).send('no user');
      }

      // match
      const isMatch = await bcrypt.compare(currentpassword, user.password);

      if (!isMatch) {
        return response
          .status(400)
          .send('you password is not correct, please insert your current password ');
        // return response.status(400).json({ error: [{ message: 'Invalid Credentials' }] });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();
      response.status(200).send('changed');
    } catch (error) {
      response.status(404).send('Server error');
    }
  },
);

module.exports = router;
