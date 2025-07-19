const express = require("express");
const conversationRouter = express.Router();
const Conversation = require("../models/ConversationSchema.js");

conversationRouter.post("/", (req, res) => {
  const conversation = new Conversation(req.body);
  conversation
    .save()
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .send({ message: "Unable to complete request, please try again!" });
      } else {
        return res.status(200).send(data);
      }
    })
    .catch((error) => {
      return res.status(500).send(error.code);
    });
});

conversationRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ message: "Unable to add an entry" });
  }
  const updateConversation = Conversation.findByIdAndUpdate(id, {
    $push: req.body,
  });
  updateConversation
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send({ message: "Unable to complete request, please try again!" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => {
      res.status(500).send(error.code);
    });
});

conversationRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res
      .status(400)
      .send({ message: "Unable to retrieve conversation without a ID" });
  }
  const conversation = Conversation.findById(id);
  conversation
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: "No conversation available. Let's start a new one!",
        });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

conversationRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res
      .status(400)
      .send({ message: "Unable to delete conversation without an ID" });
  }
  const conversation = Conversation.findByIdAndDelete(id);
  conversation
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "No conversation to delete." });
      } else {
        res.status(200).send({ message: "Conversation has been deleted!" });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." });
    });
});

module.exports = conversationRouter;
