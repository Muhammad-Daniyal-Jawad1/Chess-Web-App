const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  skill_level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Master'],
    required: true
  },
  elo_rating: {
    type: Number,
    required: true
  },
  refreshToken: {
    type: String,
  
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;