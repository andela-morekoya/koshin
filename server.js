const dotenv = require('dotenv').config({ silent: true });
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const userController = require('./server/controllers/userController');
const route = require('./server/routes');
const Logger = require('./tracer');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const port = process.env.PORT || 3000;
const app = express();
if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'development'; }
const compiler = webpack(config);
if (process.env.NODE_ENV === 'development') {

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
}

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));
const oneDay = 60000 * 60 * 24;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./build'));
app.use(cookieParser());
app.use(session({
  key: 'user_sid',
  secret: process.env.EXPRESSECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { expires: oneDay }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (!req.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
  }
  next();
});

app.use('/api/v1/user', route);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/'
  }),
  function (req, res) {
    res.redirect('/');
  });

app.get('/logout', ensureAuthenticated, function (req, res) {
  req.logout();
  res.clearCookie('user_sid');
  res.redirect('/');
});

app.get('/loggedin', (req, res) => {
  if (req.cookies.user_sid) {
    userController.createUsers(req, res);
  } else {
    res.send('');
  }
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, (err) => {
  if (!err) {
    Logger.info(`App started on port: ${port}`);
  }
});

// for testing
module.exports = app;