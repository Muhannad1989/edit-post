const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
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
    const errors = validationResult(request);

    // if they are errors
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    // pull data out the body
    const { currentpassword, password, password2 } = request.body;

    // check password
    if (password !== password2) {
      return response.json({ Error: 'passwords not match' });
    }

    try {
      let user = await User.findOne({ _id: request.user.id });

      // check if the user exsist
      if (!user) {
        return response.status(404).json({ Error: 'There is no user' });
      }

      // match inserted password (input) with current password (database)
      const isMatch = await bcrypt.compare(currentpassword, user.password);

      if (!isMatch) {
        return response
          .status(400)
          .json({ Error: 'you password is not correct, please insert your current password' });
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      // override the old password
      user.password = await bcrypt.hash(password, salt);

      // save password in database
      await user.save();
      response.status(200).json({ success: 'password has been changed' });
    } catch (error) {
      response.status(404).json({ Error: 'Server error' });
    }
  },
);

module.exports = router;
