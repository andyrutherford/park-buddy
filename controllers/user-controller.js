const User = require('../models/User');

exports.getUser = async (req, res, next) => {
  res.status(200).json({ success: true, user: 'abc' });
};

exports.addPark = async (req, res, next) => {
  console.log(req.body.userId, req.body.parkId);
  console.log(typeof req.body.parkId);
  try {
    let user = await User.findById(req.body.userId);
    user.savedPlaces.push(req.body.parkId);
    await user.save();
    res.status(201).json({
      success: true,
      savedPlaces: user.savedPlaces,
    });
  } catch (error) {
    console.log(error.message);
  }
};
