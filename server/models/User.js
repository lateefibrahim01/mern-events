const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Add any other fields relevant to your user model
  // For example, you can include fields for OAuth2 token storage, roles, etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
