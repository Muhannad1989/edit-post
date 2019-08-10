const express = require('express');
const connectDB = require('./config/db');
const app = express();
require('dotenv').config();

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
app.use('/api/reset', require('./routes/api/reset'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
