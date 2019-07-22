const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    // autoIndex: false
    // useCreateIndexes:true
    // createIndexes:true
    await mongoose.connect(db, { useNewUrlParser: true, autoIndex: false });
    console.log(`DB Connected ...`);
  } catch (error) {
    console.error(`error : ${error.message} `);
    // Exit process with failure
    process.exit();
  }
};

module.exports = connectDB;
