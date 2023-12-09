require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const coachRoutes = require('./routes/coachRoutes');
app.use('/coach', coachRoutes) ;
const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes) ;

app.get('/',(req,res)=>{res.send('Hello World!')});



app.listen(3001,() => console.log('----Server has Started-----'));
