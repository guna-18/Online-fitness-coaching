const mongoose = require('mongoose');

const userExerciseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  exerciseId: {
    type: String,
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
  dayOfWeek: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('UserExercise', userExerciseSchema);
