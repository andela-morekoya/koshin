import 'dotenv/config';
import express from 'express';
import webpack from 'webpack';
import passport from 'passport';
import {Strategy as GitHubStrategy} from 'passport-github2';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import open from 'open';
import path from 'path';
import config from './webpack.config.dev';

const port = 3000;
const app = express();
const compiler = webpack(config);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ 
                  key: 'user_sid',
                  secret: 'keyboard cat',
                  resave: false,
                  saveUninitialized: false,
                  cookie: {expires: 600000}
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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    
  });
  
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', ensureAuthenticated, function(req, res){
  req.logout();
  res.clearCookie('user_sid');
  res.redirect('/');
});

app.get('/loggedin', (req, res) => {
  if (req.cookies.user_sid) {
    // console.log(req.user);
    res.send(req.user);
  } else {
    res.send('');
  }
});

app.all('*', function(req, res) {
  res.sendFile(path.join( __dirname, 'client/src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Starting app on ${port} ...`);
    // open(`http://localhost:${port}`);
  }
});