const User = require('../models/User');

exports.getUser = async (req, res, next) => {
  const { userID } = req.params;
  console.log(userID);
  try {
    let user = await User.findById(userID);
    if (!user) {
      throw new Error('There was a problem getting the user data.');
    }
    const response = {
      id: user._id,
      name: user.name,
      image: user.image,
      savedPlaces: user.savedPlaces,
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

exports.addPark = async (req, res, next) => {
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
