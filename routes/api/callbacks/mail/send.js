const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = mail = async (response, subject, to, text) => {
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
  let mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: text, // plain text body
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
};
