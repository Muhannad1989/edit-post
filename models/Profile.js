const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  githubusername: {
    type: String,
  },
  experience: {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    location: {
      type: String,
    },
    form: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: Date,
    },
  },

  education: {
    school: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
    },
    fieldofstudy: {
      type: String,
      required: true,
    },
    form: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
    },
    current: {
      type: Boolean,
      default: false,
    },
    description: {
      type: Date,
    },
  },
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instgram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
