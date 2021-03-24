const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
  const sauce = [];
});

//sauces route, post new sauce
app.post('/api/sauce', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Login Successful.',
  });
});

module.exports = app;
