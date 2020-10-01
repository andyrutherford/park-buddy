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

// Passport config
require('./config/passport')(passport);

connectDB();

app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// parse cookies
app.use(cookieParser());

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

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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
