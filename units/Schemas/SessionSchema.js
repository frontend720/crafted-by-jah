const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  traineeReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trainerReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
    trim: true,
  },
  endTime: {
    type: Date,
    required: true,
    trim: true,
  },
  unitsRedeemed: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["booked", "completed", "cancelled"],
    required: true,
  },
  notes: {
    type: String,
    required: false,
    trim: true,
  },
});

module.exports = mongoose.model("Session", sessionSchema)
