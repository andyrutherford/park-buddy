const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  facebookId: {
    type: String,
  },
  googleId: {
    type: String,
  },
  githubId: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  savedPlaces: {
    type: [String],
  },
});

module.exports = mongoose.model('User', UserSchema);
