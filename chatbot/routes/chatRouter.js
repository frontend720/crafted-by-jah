const express = require("express");
const axios = require("axios");
const { Mistral } = require("@mistralai/mistralai");
const chatRouter = express.Router();
const instructions = require("../instructions.json")

const client = new Mistral({ apiKey: process.env.API_KEY });
chatRouter.post("/", (req, res) => {
  const prefix =
    "You are a helpful chat assistant. You reply in a southern AAVE dialect";
  const responses = [];
  const chatResponse = client.chat.complete({
    model: "mistral-large-latest",
    safePrompt: false,
    maxTokens: 500,
    messages: [
      {
        role: "user",
        content: req.body.content + instructions.instruction,
      }
    ],
  });
  chatResponse
    .then((response) => {
      if (response.object.length === 0) {
        res.status(400).send({ message: "Unable to retrieve data" });
      } else {
        res
          .status(200)
          .send(response.choices.map((choice) => choice.message.content));
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

module.exports = chatRouter;
