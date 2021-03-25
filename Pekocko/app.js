//mongodb+srv://kris:<password>@cluster0.dvwjo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//fHjuCoX7iYh0fxAu

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//problem here importing sauce model
//const sauces = require('./models/sauces');
const Sauces = require('./models/sauces');

const app = express();

mongoose
  .connect(
    'mongodb+srv://kris:fHjuCoX7iYh0fxAu@cluster0.dvwjo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Successfully Connected to MongoDB Atlas.');
  })
  .catch((error) => {
    console.log('Unable to connect to mongoDB Atlas.');
    console.log(error);
  });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(bodyParser.json());

//signup route, needs validation
app.post('/api/auth/signup', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Signup Successful.',
  });
  // do i need next here or in params?
  next();
});

//login route, needs authentication
app.post('/api/auth/login', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Login Successful.',
  });
});
//sauces route, needs sauce array
app.use('/api/sauces', (req, res, next) => {});

//sauces route, post new sauce
//
app.post('/api/sauce', (req, res, next) => {
  const sauces = new Sauces({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    mainPepper: req.body.mainPepper,
    heat: req.body.heat,
  });
  sauces
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Sauce Saved Successfully.',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

module.exports = app;
