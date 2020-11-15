const User = require('../models/User');

const generateToken = require('../utils/genToken');

// @desc    Login
exports.login = async (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
};

// @desc    Signup
exports.signup = async (req, res, next) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    // throw new Error('User already exists.  Please log in.');
    return res.send('User already exists');
  }
  const user = await User.create({
    username,
    password,
  });
  console.log(user);

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
};

// @desc    Login successful
exports.loginSuccess = async (req, res, next) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(401).send('User is not authenticated.');
  }
};

// @desc    Login failed
exports.loginFail = async (req, res, next) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticated',
  });
};

// @desc    Logout
exports.logout = async (req, res, next) => {
  req.logout();
  res.redirect(process.env.PRODUCTION_URL);
};
