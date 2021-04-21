const express = require('express');
const session = require('express-session');

const secretKey = require('./secretKey.json');

const path = require('path');
const port = 3001;

const app = express();

// Middleware to get access to request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(port, err => {
  err ? console.log('Server could not start, error: ', err) : console.log('Listening on port: ', port);
});