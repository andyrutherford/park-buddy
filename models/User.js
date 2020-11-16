const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  savedParks: {
    type: [String],
  },
});

UserSchema.methods.matchPassword = async function (submittedPassword) {
  return await bcrypt.compare(submittedPassword, this.password);
};

// Encrypt password before saving user
UserSchema.pre('save', async function (next) {
  // If updating profile, do not reencrypt password
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
