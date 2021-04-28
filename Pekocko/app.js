//mongodb+srv://kris:<password>@cluster0.dvwjo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//fHjuCoX7iYh0fxAu

const express = require('express');
//const bodyParser = require('body-parser');
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
//express now includes their own parser
//app.use(bodyParser.json());

app.use(express.json());

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
app.get('/api/sauces', (req, res, next) => {
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

//get individual sauce
app.get('/api/sauces/:id', (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});

//modify sauce recipe
app.put('/api/sauces/:id', (req, res, next) => {
  const sauce = new Sauce({
    _id: req.params.id,
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
  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() => {
      res.status(201).json({
        message: 'Sauce updated successfully',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

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
      console.log(error);
    });
});

module.exports = app;
