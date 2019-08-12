const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const mail = require('./callbacks/mail/send');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// @route           PUT api/reset
// @description     Change password post
// @access          Public
router.put(
  '/',
  [check('email', 'Please include a valid email').isEmail()],
  async (request, response) => {
    const { email } = request.body;

    const errors = validationResult(request);

    // if they are errors
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email });

      // check if the user exsist
      if (!user) {
        return response.status(404).json({ error: 'no user' });
      }

      // generate random password
      var newPassword = Math.random()
        .toString(36)
        .slice(2);

      // send the new password to user's email before bcrypt it
      await mail(
        response,
        'Reset Password',
        email,
        `Your temporarily password is  : ${newPassword}`,
      );

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      // override the old password
      user.password = await bcrypt.hash(newPassword, salt);

      // save new password on database
      await user.save();

      // return
      response.json({ newPassword: newPassword });
    } catch (error) {
      response.status(404).send('Server error');
    }
  },
);

module.exports = router;
