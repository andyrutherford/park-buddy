const User = require('../models/User');

// @desc    Signup user
// @route   POST /api/v1/auth/signup
// @access  PUBLIC
exports.signup = async (req, res, next) => {
  const { username, name, email } = req.body;

  try {
    let user = new User({
      username,
      name,
      email,
    });

    await user.save();
    console.log(user);
    res.json({ user });
  } catch (error) {
    res.send(error.message);
  }
};
