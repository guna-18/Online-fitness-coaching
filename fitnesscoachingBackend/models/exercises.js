const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  Title: {
    type: String,
  },
  Desc: {
    type: String,
  },
  Type: {
    type: String,
  },
  BodyPart: {
    type: String,
  },
  Equipment: {
    type: String
  },
  Level: {
    type: String,
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Exercise', exerciseSchema);
