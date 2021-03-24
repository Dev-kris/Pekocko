const express = require('express');

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

app.post('/api/auth/signup', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Signup Successful.',
  });
});

app.post('/api/auth/login', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Signup Successful.',
  });
});

module.exports = app;
