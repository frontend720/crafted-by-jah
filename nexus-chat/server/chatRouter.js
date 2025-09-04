const express = require("express");
const chatRouter = express.Router();
const instructions = require("./chat_instruction.json");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { HumeClient } = require("hume");

chatRouter.post("/chat", (req, res) => {
  axios({
    method: "POST",
    url: "https://api.venice.ai/api/v1/chat/completions",
    headers: {
      Authorization: `Bearer ${process.env.VENICE_API_KEY}`,
      "Content-Type": "application/json",
    },
    data: {
      model: req.body.model,
      messages: [
        {
          role: "system",
          content: `I am a virtual boyfriend and assistant who responds to the name ${req.body.bot_name}. when asked, my job is to assist a man named ${req.body.name} and keep him company. The current time is:  ${req.body.timestamp}. These are the general instructions for me, follow them closely: ${instructions.instructions}. Strictly follow these rules: ${instructions.rules}.  ${instructions.weather} +
            ${req.body.weather} +
            ${instructions.location} +
            ${req.body.location}`,
        },
        {
          role: "user",
          content: `This is the log of the current conversation: + ${req.body.chatLog} + This is the prompt to be appended: + ${req.body.prompt} + Review the conversation log to maintain context and order. If no log exists, greet the user appropriately. Respond to the user's prompt by considering the full conversation context`,
        },
      ],
      venice_parameters: {
        enable_web_search: "on",
        include_venice_system_prompt: false,
        enable_web_citations: false,
      },
      // frequency_penalty: 1,
      stream: false,
      repetition_penalty: 1.25,
      presence_penalty: 1.25,
      max_tokens: req.body.tokens,
      top_p: req.body.top_p,
      temperature: req.body.temp
    },
  })
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "Unable to complete chat request." });
      } else {
        const response = data.data;
        res.status(200).send({
          system: response.choices[0].message.content,
          user: req.body.prompt,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." + error });
    });
});

function generateRandomSeed() {
  const min = 800000000;
  const max = 999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

chatRouter.post("/image", (req, res) => {
  const randomSeed = generateRandomSeed();
  axios({
    method: "POST",
    url: "https://api.venice.ai/api/v1/image/generate",
    headers: {
      Authorization: `Bearer ${process.env.VENICE_API_KEY}`,
      "Content-Type": "application/json",
    },
    data: {
      model: req.body.model,
      prompt: instructions.image + req.body.prompt,
      height: 1024,
      width: 1024,
      steps: 30,
      cfg_scale: 19,
      seed: randomSeed,
      lora_strength: 75,
      safe_mode: false,
      return_binary: false,
      hide_watermark: true,
      style_preset: req.body.style_preset
    },
  })
    .then((response) => {
      const base64Image = response.data.images[0];
      const imageUrl = `data:image/webp;base64,${base64Image}`;
      res.status(200).send({ imageUrl });
    })
    .catch((error) => {
      console.error(
        "Image generation error:",
        error.response?.data || error.message
      );
      res.status(500).send({
        message: "Image generation failed",
        error: error.response?.data || error.message,
      });
    });
});

chatRouter.post("/in-paint", (req, res) => {
    const {image, prompt} = req.body
  if (!prompt || !image) {
    res
      .status(400)
      .send({ message: "Can't send request without image or edit prompt" });
  }
  axios({
    method: "POST",
    url: "https://api.venice.ai/api/v1/image/edit",
    headers: {
      Authorization: `Bearer ${process.env.VENICE_API_KEY}`,
      "Content-Type": "application/json",
    },
    data: {
      prompt: prompt,
      image: image,

    },
  })
    .then((response) => {
      if (!response) {
        res
          .status(400)
          .send({ message: "Unable to complete request. Try again later." });
      } else {
        res.status(200).send(response.data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        code: error.code,
        message: error.message,
      });
    });
});

const OPEN_WEATHER_API = "f7651502dd5e5d6b5316219d628cb9c3";

chatRouter.post("/weather", async (req, res) => {
  const { lat, long } = req.body;
  if (!lat || !long) {
    return res
      .status(400)
      .send({ message: "request must include a latitude and longitude" });
  }
  try {
    const response = await axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&&appid=${OPEN_WEATHER_API}`,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

console.log(process.env.OPEN_WEATHER_API);

module.exports = chatRouter;
