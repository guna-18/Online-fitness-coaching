const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercises');
const Users = require('../models/userDetails')

// Get all exercises
router.get('/exercises', async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/exerciseOptions', async (req, res) => {
    try {
        const types = await Exercise.distinct('Type');
        const bodyParts = await Exercise.distinct('BodyPart');
        const levels = await Exercise.distinct('Level');

        res.json({
            types,
            bodyParts,
            levels
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.post('/exercises', async (req, res) => {
    try {
        const newExercise = new Exercise(req.body);
        await newExercise.save();
        res.status(201).send('Exercise added successfully');
    } catch (error) {
        res.status(500).send('Error adding exercise');
    }
});

router.put('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUser = await Users.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.send(updatedUser);
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});

router.delete('/exercises', async (req, res) => {
    try {
        const { ids } = req.body; // Array of exercise IDs to be deleted
        await Exercise.deleteMany({ _id: { $in: ids } });
        res.send('Exercises deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting exercises');
    }
});



module.exports = router;
