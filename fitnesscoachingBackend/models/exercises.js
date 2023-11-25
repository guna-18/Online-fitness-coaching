const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  bodypart: {
    type: String,
  },
  equipment: {
    type: String
  },
  level: {
    type: String,
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Exercise', exerciseSchema);
