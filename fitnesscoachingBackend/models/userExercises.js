const mongoose = require('mongoose');

const userExerciseSchema = new mongoose.Schema({
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
  dayOfWeek: {
    type: String,
    required: true
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('UserExercise', userExerciseSchema);
