const express = require('express');
const session = require('express-session');

const secret = require('./secretKey.json');

const path = require('path');
const port = 3001;

const channelPrefix = '/api/v1/channels';
const programPrefix = '/api/v1/programs';
const episodePrefix = '/api/v1/episodes';
const categoryPrefix = '/api/v1/categories';
const userPrefix = "/api/v1/users";
const favouritePrefix = "/api/v1/favourites";

const channelRoutes = require("./routes/channelRoutes");
const programRoutes = require("./routes/programRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const episodeRoutes = require("./routes/episodeRoutes");
const userRoutes = require("./routes/userRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: secret.secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: "auto",
    maxAge: (1000*60*60*12)   // Expires after 12h, with this setting
  }
}));

app.use(channelPrefix, channelRoutes);
app.use(programPrefix, programRoutes);
app.use(categoryPrefix, categoryRoutes);
app.use(episodePrefix, episodeRoutes);
app.use(userPrefix, userRoutes);
app.use(favouritePrefix, favouriteRoutes);

// On build is the folder now avaliable for the backend and the app can be run via BE.
app.use(express.static(path.join(__dirname, '../build')));

app.listen(port, err => {
  err ? console.log('Server could not start, error: ', err) : console.log('Listening on port:', port);
});