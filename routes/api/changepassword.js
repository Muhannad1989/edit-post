const express = require('express');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const router = express.Router();

// @route           PUT api/user/change
// @description     Change password post
// @access          Private
router.put(
  '/xxx',
  [
    auth,
    // [
    //   check('password', 'Please enter a password with 6 or more characters ').isLength({ min: 6 }),
    //   check('password2', 'Please enter a password with 6 or more characters ').isLength({ min: 6 }),
    // ],
  ],
  async (request, response) => {
    // const errors = validationResult(request);
    // // if they are errors
    // if (!errors.isEmpty()) {
    //   return response.status(400).json({ errors: errors.array() });
    // }

    // check current password

    console.log(request.user);

    // let result = currentPassword;
    // if (password !== password2) {
    //   return response.json({ errors: 'passwords not match' });
    // }

    // // check password
    // if (password !== password2) {
    //   return response.json({ errors: 'passwords not match' });
    // }
    // const { currentPassword, password, password2 } = request.body;
    try {
      // check if the user exsist

      // let user = await User.findOne({ email });

      // // Encrypt password
      // const salt = await bcrypt.genSalt(10);

      // user.password = await bcrypt.hash(password, salt);
      // await user.save();
      response.send('good');
    } catch (error) {
      // console.log(error.message)
      response.status(404).send('Server error');
    }
  },
);

module.exports = router;
