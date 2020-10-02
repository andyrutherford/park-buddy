const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportConfig = require('./config/passport');
const session = require('express-session');
const auth = require('./routes/auth-route');
const user = require('./routes/user-route');
const connectDB = require('./config/db');
const app = express();

dotenv.config({ path: './config/config.env' });

connectDB();

app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
    sameSite: 'none',
  })
);

// parse cookies
app.use(cookieParser());

app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      sameSite: 'none',
    },
  })
);

// CORS
app.use(
  cors({
    origin: process.env.PRODUCTION_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(express.json());

// HTTP request logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
});

// Passport middleware

app.use(passport.initialize());
app.use(passport.session());

// Passport config
require('./config/passport')(passport);

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else res.status(401).send('You must be logged in to complete this action.');
};

// Routes
app.use('/auth', auth);
app.use('/user', ensureAuthenticated, user);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}.`));
