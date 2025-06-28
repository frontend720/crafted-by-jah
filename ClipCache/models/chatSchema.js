const {Schema, default: mongoose} = require("mongoose")

const chatSchema = new Schema({
  query: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  },
  promptId: {
    type: String,
    required: true
  },
  totalTokens: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model("Chat", chatSchema)