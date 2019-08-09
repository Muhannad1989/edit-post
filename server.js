const express = require('express');
const connectDB = require('./config/db');
const nodemailer = require('nodemailer');
const app = express();
require('dotenv').config();

const router = express.Router();
// Init Middleware
app.use(express.json({ extended: false }));

// connect with mongo DB Atlas
connectDB();

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

app.use('/api/changepassword', require('./routes/api/changepassword'));

app.use('/api/send', require('./routes/api/send'));

// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });
// app.post('/api/send', async (request, response) => {
//   let mailOptions = {
//     from: process.env.EMAIL,
//     to: request.body.to,
//     subject: request.body.subject,
//     text: request.body.text,
//     // html: 'could be an html markup ', // html body / component
//   };
//   transporter.sendMail(mailOptions, (err, data) => {
//     if (err) {
//       return response.json({ error: `Error occurs : ${err} ` });
//     }
//     return response.json({ Result: 'Email sent!!!' });
//   });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
