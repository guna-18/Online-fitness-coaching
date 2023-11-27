const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  coachId: {
    type: String
  },
  userId: {
    type: String
  },
  type: {
    type: String,
    enum: ['elite', 'basic'] // Add more types as needed

  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Membership', membershipSchema);
