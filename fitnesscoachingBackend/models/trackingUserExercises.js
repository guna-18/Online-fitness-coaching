const mongoose = require('mongoose');

const exerciseTrackingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails', // Reference to the UserDetails collection
    required: true
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise', // Reference to the Exercise collection
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  datePerformed: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('ExerciseTracking', exerciseTrackingSchema);
