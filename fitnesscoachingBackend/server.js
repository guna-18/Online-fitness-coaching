<<<<<<< Updated upstream
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
=======
require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const UserDetails = require("./models/userDetails");
>>>>>>> Stashed changes

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

<<<<<<< Updated upstream
const coachRoutes = require('./routes/coachRoutes');
app.use('/coach', coachRoutes) ;
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes) ;
=======
const coachRoutes = require("./routes/coachRoutes");
app.use("/coach", coachRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);
const Membership = require("./models/membership");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
>>>>>>> Stashed changes

app.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      address,
      height,
      weight,
      gender,
      age,
      usertype,
    } = req.body;

<<<<<<< Updated upstream
=======
    const existingUser = await UserDetails.findOne({ email });

    if (existingUser) {
      return res.status(401).send("Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserDetails({
      name,
      email,
      phoneNumber,
      hashedPassword,
      address,
      height,
      weight,
      gender,
      age,
      usertype,
    });

    await user.save();
    res.status(201).send("User registered successfully.");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Add a new route to handle fetching membership data
app.get("/membership/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the membership data based on the user ID
    const membershipData = await Membership.findOne({ userId });

    if (!membershipData) {
      return res.status(404).json({ message: "Membership data not found" });
    }

    res.status(200).json(membershipData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
>>>>>>> Stashed changes

    const user = await UserDetails.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid email or password.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password.");
    }
    const userId = user._id.toString();

    res.status(200).json({
      message: "Login successful.",
      userId: userId,
      usertype: user.usertype,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3001, () => console.log("----Server has Started-----"));
