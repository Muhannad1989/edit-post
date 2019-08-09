const User = require('../../../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = signWithAnotherAccount = async (request, response) => {
  // come from the body

  try {
    // we make a request to the database to check if the user exsist
    let user = await User.findOne({ email });

    if (!user) {
      return response.status(400).json({ error: [{ message: 'Invalid Credentials' }] });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
      if (err) throw error;
      response.status(200).send({ token });
    });
  } catch (error) {
    // console.log(error.message)
    response.status(404).send('Server error');
  }
};
