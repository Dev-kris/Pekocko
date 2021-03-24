const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('Request Received');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});
// test method
app.use((req, res, next) => {
  res.json({ message: 'Your request was successful.' });
  next();
});

app.use((req, res, next) => {
  console.log('Response Sent Successfully.');
});

module.exports = app;
