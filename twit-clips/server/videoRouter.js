/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const videoRouter = express.Router();
const Video = require("./videoSchema.js");

// Start a new video collection

videoRouter.post("/", (req, res) => {
  const savedVideo = new Video(req.body);
  savedVideo
    .save()
    .then((data) => {
      if (!req.body) {
        res.status(400).send({ message: "Unable to save without video url." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." + error.code });
    });
});

// !Retrieve a video

videoRouter.get("/", (req, res) => {
  const getVideos = Video.find({});
  getVideos
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message:
            "No videos to retrieve, try saving some videos and try again",
        });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." + error.code });
    });
});

// Retrieve all videos

videoRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const getVideo = Video.findOne({ _id: id });
  getVideo
    .then((data) => {
      if (!id) {
        res
          .status(400)
          .send({ message: "Unable to retrieve that video, try another one." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." + error.code });
    });
});

// Add another video

videoRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send({ message: "Unable to push new video to feed" });
  }
  const updateFeed = Video.findByIdAndUpdate(id, {
    $push: req.body,
  });
  updateFeed
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "Unable to update media, try again." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." + error.code });
    });
});

// Delete Saved Video

videoRouter.delete("/:id/:url_id", (req, res) => {
  const { id, url_id } = req.params;
  const deleteUrl = Video.findOneAndUpdate(
    { _id: id },
    { $pull: { urls: { _id: url_id } } },
    { new: true }
  );
  deleteUrl
    .then((data) => {
      if (!id && url_id) {
        res
          .status(400)
          .send({ message: "Cant delete video without URL and ID" });
      } else {
        res.status(200).send({message: "Updated video collection and deleted video with ID "+ url_id});
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

// Drop Video Collection

videoRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleteVideo = Video.findOneAndDelete({ _id: id });
  deleteVideo
    .then((data) => {
      if (!id) {
        res
          .status(400)
          .send({ message: "Unable to delete video without video ID" });
      } else {
        res
          .status(200)
          .send({ message: "Successfully dropped collection with ID " + id });
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." + error.code });
    });
});

module.exports = videoRouter;
