const express = require('express');
const router = express.Router();
const mail = require('./callbacks/mail/send');

const sendEmail = async (request, response) => {
  const { subject, to, text } = request.body;
  mail(response, subject, to, text);
};

router.post('/', sendEmail);

module.exports = router;
