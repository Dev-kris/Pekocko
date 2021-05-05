//mongodb+srv://kris:<password>@cluster0.dvwjo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//fHjuCoX7iYh0fxAu

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
const helmet = require('helmet');

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
app.use(bodyParser.json());
app.use(helmet()); //helps prevent XSS attacks (primarily through CSP)
app.use(mongoSanitize()); //removes $ and . for db protection.

//app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
