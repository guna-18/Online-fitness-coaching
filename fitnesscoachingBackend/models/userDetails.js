const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  address: String,
  height: Number,
  weight: Number,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  age: Number,
  usertype: {
    type: String,
    enum: ['Admin', 'User', 'Coach']
  },
  profileImage: {
    data: Buffer,
    contentType: String
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('UserDetails', userDetailsSchema);
