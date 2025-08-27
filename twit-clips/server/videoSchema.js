/* eslint-disable no-undef */
const mongoose = require("mongoose");
const moment = require("moment");

const VideoSchema = mongoose.Schema({
  urls: [
    {
      url: {
        type: String,
        required: true,
      },
      createdAt: {
        type: String,
        default: ()  => moment().format("lll"),
      },
      handle: {
        type: String,
        required: true,
      },
    },
  ],
  usename: {
    type: String,
    // required: true
  }
});

module.exports = mongoose.model("Video", VideoSchema);
