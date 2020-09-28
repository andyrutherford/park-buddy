const CLIENT_URL = 'http://localhost:3000';

// @desc    Login successful
exports.loginSuccess = async (req, res, next) => {
  if (req.user) {
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
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
  // res.status(200).json({
  //   success: true,
  //   message: 'You have logged out.',
  // });
  res.redirect(CLIENT_URL);
};
