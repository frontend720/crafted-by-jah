const express = require("express");
const chatRouter = express.Router();
const axios = require("axios");
const { Mistral } = require("@mistralai/mistralai");
const Chat = require("../models/chatSchema")
const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: apiKey });

console.log(new Chat)

chatRouter.post("/", (req, res) => {
  const chatResponse = client.chat.complete({
    model: "mistral-medium-2505",
    messages: [{role: "user", content: req.body.query}]
  });
  chatResponse.then((data) => {
    if(!data){
        res.status(400).send("Error")
    }else{
        res.status(200).send(data)
    }
  }).catch((error) => {
    res.status(error).send({message: "Internal server error"})
  })
});

// post, put, delete, get

module.exports = chatRouter;
