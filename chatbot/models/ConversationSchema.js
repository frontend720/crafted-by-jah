const mongoose = require("mongoose");
const moment = require("moment");
const ConversationSchema = new mongoose.Schema({
  chat: [
    {
      question: {
        type: String,
        required: true,
      },
      response: {
        type: String,
        required: true,
      },
      timestamp: {
        type: String,
        default: moment().format("lll"),
      },
      image: {
        type: String,
        // required: true,
      },
      imageDescription: {
        type: String,
        // required: true,
      },
    },
  ],

  conversationName: {
    type: String,
  },
  createdAt: {
    type: String,
    default: moment().format("LLL"),
  },
});

module.exports = mongoose.model("Conversation", ConversationSchema);
