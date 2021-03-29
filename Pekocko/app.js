//mongodb+srv://kris:<password>@cluster0.dvwjo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//fHjuCoX7iYh0fxAu

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Sauce = require('./models/Sauce');

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
app.use('/api/sauces', (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
      console.log('all sauces listed');
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

/* TEST DATA

{
  const sauce = new Sauce({
    name: 'test',
    manufacturer: 'teat mfg',
    description: 'test desc',
    imageUrl: 'test img',
    mainPepper: 'test chili ',
    heat: 4,
    likes: 2,
    dislikes: 3,
    usersLiked: [],
    usersDisliked: [],
  });
*/

//sauces route, post new sauce
//
app.post('/api/sauces', (req, res, next) => {
  const sauce = new Sauce({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    mainPepper: req.body.mainPepper,
    heat: req.body.heat,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
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
