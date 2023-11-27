require('dotenv').config();
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(express.static('public'));
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

const Exercises = require('../models/exercises.js');
const UserDetails = require('../models/userDetails.js');
const Membership = require('../models/membership.js');
const UserExercises = require('../models/userExercises.js');

const mongoose = require('mongoose');

// connect to database code:
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
const db = mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=>console.log('----Connected to MONGO DB----'));


router.get('/', (req, res) => {
    // Your GET request handling logic here
    res.send('indexPage of coach');
});



router.get('/clientInfo/:userId', async (req, res) =>{
    try {
        const userId = req.params.userId;
        console.log(userId);
        const userDetails = await UserDetails.findOne({ _id: userId});
        console.log(userDetails);

        if (!userDetails) {
        return res.status(404).send('User not found');
        }

        res.json({
          userId: userDetails._id,
          name: userDetails.name,
          email: userDetails.email,
          phoneNumber: userDetails.phoneNumber,
          address: userDetails.address,
          height: userDetails.height,
          weight: userDetails.weight,
          gender: userDetails.gender,
          age: userDetails.age,
          usertype: userDetails.usertype
        });
      } catch (error) {
        console.error('Error fetching client info:', error);
        res.status(500).send('Internal Server Error');
      }
});



router.get('/getClients/:coachId', async (req, res) => {
    try {
        const cId = req.params.coachId;

        const memberships = await Membership.find({ "coachId": cId });
        console.log("Memberships:", memberships);


        const clientUserIds = memberships.map(membership => membership.userId).filter(userId => userId !== null);
        console.log("User IDs of clients:", clientUserIds);


        const clients = await UserDetails.find({ _id: { $in: clientUserIds } });
        console.log("List of clients info:", clients);


        res.json(clients);
        
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

router.get('/exercises', async (req, res) => {
    try {
        const exercises = await Exercises.find();
        console.log('All exercises:', exercises);
        res.json(exercises);
      } 
      catch (error) {
        console.error('Error fetching exercises:', error);
        res.status(500).send('Internal Server Error');f
      }
});


router.get('/exercises/:userId', async (req, res) => {
    try {
      const uId = req.params.userId;
      const userExercises = await UserExercises.find({ "userId" : uId });
      console.log('Exercises for user with userId:', uId, userExercises);
      res.json(userExercises);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});

router.put('/exercises', async (req, res) => {
    if (!req.body.userId && !req.body.exerciseId ) {
        return res.status(400).json({ error: 'some fields are required in the request body' });
    }
    else
    {
        const userId = req.body.userId;
        const exerciseId = req.body.exerciseId;
        const updateFields = {};
        if(req.body.sets)
        {
            const sets = req.body.sets;
            updateFields.sets = sets;
        }
        if(req.body.reps)
        {
            const reps = req.body.reps;
            updateFields.reps = reps;
        }
        if(req.body.dayOfWeek)
        {
            const dayOfWeek = req.body.dayOfWeek;
            updateFields.dayOfWeek = dayOfWeek;
        }
        
        console.log('updateFields:', updateFields);

        const updatedExercise = await UserExercises.findOneAndUpdate(
            { userId: userId, exerciseId: exerciseId },
            updateFields,
            { new: true } 
        );

        if (!updatedExercise) {
            return res.status(404).json({ error: 'Exercise not found for the given userId and exerciseId' });
        }

        res.json(updatedExercise);
    }

    res.send('updates an exercise added to  userCart');
});

router.post('/exercises', async (req, res) => {
    try{
    const exercisesToAdd = req.body;
    console.log('exercisestoadd', exercisesToAdd);
    const addedExercises = await UserExercises.insertMany(exercisesToAdd);
    res.json(addedExercises);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/exercises/:userId', async (req, res) => {
    try {
      const uId = req.params.userId;
      const result = await UserExercises.deleteMany({ "userId" : uId });
      if (result.deletedCount > 0) {
        res.json({ message: "Deleted all exercises for user with userId: ${uId}"})
    }
       else {
        res.status(404).json({ message: `No exercises found for user with userId: ${uId}` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});


module.exports = router;