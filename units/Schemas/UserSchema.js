const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: [8, "Password must be at least 8 characters long"],
    trim: true,
  },
  role: {
    type: String,
    enum: ["trainer", "trainee"],
    required: true,
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
