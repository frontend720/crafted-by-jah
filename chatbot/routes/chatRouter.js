const express = require("express");
const axios = require("axios");
const { Mistral } = require("@mistralai/mistralai");
const chatRouter = express.Router();
const instructions = require("../instructions.json");
const moment = require("moment")

const client = new Mistral({ apiKey: process.env.API_KEY });
chatRouter.post("/", (req, res) => {
  const responses = [];
  const chatResponse = client.chat.complete({
    model: "mistral-large-latest",
    safePrompt: false,
    maxTokens: 1000,
    temperature: 1,
    topP: req.body.topP,
    n: 1,
    messages: [
      {
        role: "user",
        content: req.body.content + instructions.section_one + (req.body.name || "Tariq") + instructions.section_two + "if the user provides any special instruction they are as follows " + req.body.instructions + 
      "The time is currently" + moment().format('LLL') + "Please carefully follow these rules and guidelines " + instructions.rules + "this is a description of your physical representation  " + instructions.avatar + "Use this description to further develop your personality"
      },
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

chatRouter.post("/image_analysis", (req, res) => {
  const analysisResponse = client.chat.complete({
    model: "pixtral-12b",
    maxTokens: 500,
    temperature: 1,
    topP: 1,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              req.body.text + instructions.prepend,
          },
          { type: "image_url", imageUrl: req.body.imageUrl },
        ],
      },
    ],
  });
  analysisResponse
    .then((response) => {
      if (!response) {
        res.status(400).send({
          message: "No image to analyze, please pic an image and try again",
        });
      } else {
        res.status(200).send(response.choices[0].message.content);
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

module.exports = chatRouter;
