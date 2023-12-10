require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const UserDetails = require('./models/userDetails');

app.use(express.static('public'));

// Use express.json() with a larger limit for handling JSON payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only your frontend to access
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions)); // Use CORS with options

// Include your routes here
const coachRoutes = require('./routes/coachRoutes');
app.use('/coach', coachRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);
const adminRoutes = require('./routes/adminRoutes');
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', upload.single('profileImage'), async (req, res) => {
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

    const existingUser = await UserDetails.findOne({ email });
    if (existingUser) {
      return res.status(401).send('Email already registered.');
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
      profileImage: req.file ? {
        data: req.file.buffer,
        contentType: req.file.mimetype
      } : undefined
    });

    await user.save();
    res.status(201).send('User registered successfully.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserDetails.findOne({ email });

    if (!user) {
      return res.status(401).send('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid email or password.');
    }
    const userId = user._id.toString();

    res.status(200).json({
      message: 'Login successful.',
      userId: userId,
      usertype: user.usertype
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3001, () => console.log('----Server has Started-----'));
