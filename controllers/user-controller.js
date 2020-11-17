const User = require('../models/User');

exports.getUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) {
      throw new Error('There was a problem getting the user data.');
    }
    const response = {
      id: user._id,
      name: user.name,
      image: user.image,
      savedParks: user.savedParks,
      social: {
        facebook: user.facebookId,
        google: user.googleId,
        github: user.githubId,
      },
    };

    res.status(200).json({ success: true, user: response });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getUserParks = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select(
      'savedParks username'
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

exports.addPark = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (user.savedParks.includes(req.body.parkId)) {
      user.savedParks = user.savedParks.filter((p) => p !== req.body.parkId);
    } else {
      user.savedParks.push(req.body.parkId);
    }
    await user.save();
    res.status(201).json({
      success: true,
      savedParks: user.savedParks,
    });
  } catch (error) {
    console.log(error.message);
  }
};
