const express = require('express');
const User = require('../../models/User');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');

const router = express.Router();

router.post(
  '/:email/:name',

  async (request, response) => {
    // come from the body
    const { email, name } = request.params;
    try {
      // check if the user exsist
      let user = await User.findOne({ email });

      if (user) {
        // login if its exsist
        return response.status(404).json({ error: [{ message: 'User is already exsist' }] });
      }

      // generate avatar

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // create instance
      user = new User({
        name,
        email,
        avatar,
      });

      // save without password (name , email , avatar)
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

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
