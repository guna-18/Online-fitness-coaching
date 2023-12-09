require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const coachRoutes = require('./routes/coachRoutes');
app.use('/coach', coachRoutes) ;

app.get('/',(req,res)=>{res.send('Hello World!')});



app.listen(3001,() => console.log('----Server has Started-----'));
