const express = require('express');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const mail = require('./callbacks/mail/send');

const router = express.Router();

// @route           PUT api/user/change
// @description     Change password post
// @access          Private
router.put('/', async (request, response) => {
  const { email } = request.body;
  // const errors = validationResult(request);
  // if they are errors
  // if (!errors.isEmpty()) {
  //   return response.status(400).json({ errors: errors.array() });
  // }

  // check password

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

    await mail(
      response,
      'Reset Password',
      'muhannadjudah@gmail.com',
      `Your temporarily password is  : ${newPassword}`,
    );

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);
    // console.log(`new password after bcrypt: ${newPassword}`);

    await user.save();

    response.json({ newPassword: newPassword });
  } catch (error) {
    response.status(404).send('Server error');
  }
});

module.exports = router;
