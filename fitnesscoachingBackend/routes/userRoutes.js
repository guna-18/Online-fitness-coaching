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
const trackingUserExercises = require('../models/trackingUserExercises.js');

const mongoose = require('mongoose');

// connect to database code:
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
const db = mongoose.connection
db.on('error', (error)=>console.error(error))
db.once('open', ()=>console.log('----Connected to MONGO DB----'));

router.get('/recommend',async (req,res)=>{
    try{
        const recommendations=await Exercises.aggregate([
            {$sample:{size:7}}
        ]);
        res.json(recommendations);
    }
    catch(error){
        console.error('Error fetching exercises',error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/search',async (req,res)=>{
    try{
        const query={};
        var search;
        if(JSON.stringify(req.query)!="{}"){
            var criteriaArray=req.query.criteria.split(",");
            var searchArray=req.query.search.split(',');
            for(var i=0;i<criteriaArray.length;i++){
                search=new RegExp(searchArray[i],"i");
                query[criteriaArray[i]]={$regex:search};
            }
        }

        const searchResults=await Exercises.find(query);
        res.json(searchResults);
    }
    catch(error){
        console.error('Error fetching exercises',error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/track',async (req,res)=>{
    try{
        const {userId,exerciseId,sets,reps,datePerformed}=req.body;
        const newTrackingExercise={
            "userId":userId,
            "exerciseId":exerciseId,
            "sets":sets,
            "reps":reps,
            "datePerformed":datePerformed
        };
        const insertedTrackingExercise=await trackingUserExercises.insert(newTrackingExercise);
        res.send('Tracking done successfully!');
    }
    catch(err){
        console.error('Error doing tracking:',err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

router.post('/addExercise',async (req,res)=>{
    try{
        const {userId,exerciseId,sets,reps,dayOfWeek}=req.body;
        const newExercise={
            "userId":userId,
            "exerciseId":exerciseId,
            "sets":sets,
            "reps":reps,
            "dayOfWeek":dayOfWeek
        };
        const insertedExercise=await UserExercises.insert(newExercise);
        res.send('Exercise added successfully!');
    }
    catch(err){
        console.error('Error adding exercise:',err);
        res.status(500).json({error:'Internal Server Error'});
    }
});

module.exports = router;