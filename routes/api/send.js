const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();
require('dotenv').config();

// Step 1
let transporter = nodemailer.createTransport({
  // host: 'mail.abc@gmail.com',
  // port: 587,
  // secure: false, // true for 465, false for other ports
  service: 'gmail',
  auth: {
    user: process.env.EMAIL || 'abc@gmail.com', // TODO: your gmail account
    pass: process.env.PASSWORD || '0000', // TODO: your gmail password
  },
  // tls: {
  //   rejectUnauthorized: false,
  // },
});

router.post('/api/send', async (request, response) => {
  let mailOptions = {
    from: process.env.EMAIL,
    to: request.body.to,
    subject: request.body.subject,
    text: request.body.text, // plain text body
    // html: 'could be an html markup ', // html body / component
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return response.json({ error: `Error occurs : ${err} ` });
    }
    // console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // res.render('contact', { msg: 'Email has been sent' });
    return response.json({ Result: 'Email sent!!!' });
  });
});

module.exports = router;
