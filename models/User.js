const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  googleId: {
    type: String,
  },
  displayName: {
    type: String,
  },
  image: {
    type: String,
  },
  // username: {
  //   type: String,
  //   unique: true,
  // },
  // name: {
  //   type: String,
  // },
  // email: {
  //   type: String,
  //   trim: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  savedPlaces: {
    type: [Array],
  },
});

module.exports = mongoose.model('User', UserSchema);
