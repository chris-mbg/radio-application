const express = require('express');
const session = require('express-session');

const secret = require('./secretKey.json');

const path = require('path');
const port = 3001;

const channelPrefix = '/api/v1/channels';
const programPrefix = '/api/v1/programs';
const episodePrefix = '/api/v1/episodes';
const categoryPrefix = '/api/v1/categories'
const userPrefix = "/api/v1/users"

const channelRoutes = require("./routes/channelRoutes");
const programRoutes = require("./routes/programRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

//const episodeRoutes = require("./routes/episodeRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware to get access to request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: secret.secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: "auto",
    maxAge: 1000 * 60 * 60    // Expires after 60 min, with this setting
  }
}));

app.use(channelPrefix, channelRoutes);
app.use(programPrefix, programRoutes);
app.use(categoryPrefix, categoryRoutes);
//app.use(episodePrefix, episodeRoutes);
app.use(userPrefix, userRoutes);

// The build folder is now avaliable for the backend. Can run the application via the backend
//app.use(express.static(path.join(__dirname, '../build')));

app.listen(port, err => {
  err ? console.log('Server could not start, error: ', err) : console.log('Listening on port: ', port);
});