require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(express.static("public"));
router.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
router.use(bodyParser.json());

const Exercises = require("../models/exercises.js");
const UserDetails = require("../models/userDetails.js");
const Membership = require("../models/membership.js");
const UserExercises = require("../models/userExercises.js");
const trackingUserExercises = require("../models/trackingUserExercises.js");

const mongoose = require("mongoose");

// connect to database code:
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("----Connected to MONGO DB----"));

router.get("/search", async (req, res) => {
  try {
    const query = {};
    var search;
    if (JSON.stringify(req.query) != "{}") {
      var criteriaArray = req.query.criteria.split(",");
      var searchArray = req.query.search.split(",");
      for (var i = 0; i < criteriaArray.length; i++) {
        search = new RegExp(searchArray[i], "i");
        query[criteriaArray[i]] = { $regex: search };
      }
    }

    const searchResults = await Exercises.find(query);
    res.json(searchResults);
  } catch (error) {
    console.error("Error fetching exercises", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/add", async (req, res) => {
  try {
    const exercisesToAdd = req.body;
    //req.session.cart=exercisesToAdd;
    res.send("Exercises saved in session!");
  } catch (err) {
    console.error("Error saving exercises in session:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/exercises/:exerciseId", async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;
    const result = await UserExercises.deleteOne({ _id: exerciseId });
    if (result.deletedCount > 0) {
      res.json({
        message: "Deleted an exercise with exerciseId: ${exerciseId}",
      });
    } else {
      res
        .status(404)
        .json({ message: `No exercises found with exerciseId: ${exerciseId}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/recommend/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const recommendations = await UserExercises.find({ userId: userId }).limit(
      6
    );
    res.json(recommendations);
  } catch (error) {
    console.error("Error fetching exercises", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/all/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const recommendations = await UserExercises.find({ userId: userId });
    res.json(recommendations);
  } catch (error) {
    console.error("Error fetching exercises", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/track", async (req, res) => {
  try {
    const newTrackingExercise = req.body;
    console.log(newTrackingExercise);
    const insertedTrackingExercise = await trackingUserExercises.insertMany(
      newTrackingExercise
    );
    res.send("Tracking done successfully!");
  } catch (err) {
    console.error("Error doing tracking:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addExercise", async (req, res) => {
  try {
    const exercisesToAdd = req.body;
    const insertedExercise = await UserExercises.insertMany(exercisesToAdd);
    res.send("Exercises added successfully!");
  } catch (err) {
    console.error("Error adding exercises:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
