import 'dotenv/config';
import express from 'express';
import webpack from 'webpack';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import open from 'open';
import path from 'path';
import config from './webpack.config.dev';
import userController from './server/controllers/userController';
import route from './server/routes';
import Logger from './tracer';

const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

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
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

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
    userController.createUsers(req);
    res.send(req.user);
  } else {
    res.send('');
  }
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/src/index.html'));
});

app.listen(port, (err) => {
  if (!err) {
    Logger.info(`App started on port: ${port}`);
  }
});
