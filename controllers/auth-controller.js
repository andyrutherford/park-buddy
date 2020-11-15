// @desc    Login
exports.login = async (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
};

// @desc    Signup
exports.signup = async (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
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
