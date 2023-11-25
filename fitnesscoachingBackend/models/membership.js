const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails', // Reference to the UserDetails collection for coaches
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails', // Reference to the UserDetails collection for users
    required: true
  },
  type: {
    type: String,
    enum: ['elite', 'basic'], // Add more types as needed
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('Membership', membershipSchema);
