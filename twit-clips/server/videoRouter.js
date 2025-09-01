/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const videoRouter = express.Router();
const Video = require("./videoSchema.js");
const AuthSchema = require("./AuthSchema.js");
// Start a new video collection

// videoRouter.post("/", (req, res) => {
//   const savedVideo = new Video(req.body);
//   const auth = AuthSchema;
//   auth.findOne({ _id: req.body.userId }).then((user) => {
//     if (!user) {
//       return res.status(400).send({ message: "User does not exist!" });
//     }
//   });
//   savedVideo
//     .save()
//     .then((data) => {
//       if (!req.body) {
//         res.status(400).send({ message: "Unable to save without video url." });
//       } else {
//         res.status(200).send(data);
//       }
//     })
//     .catch((error) => {
//       res.status(500).send({ message: "Internal server error." + error.code });
//     });
// });

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
  const getVideo = Video.find({ userId: id });
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
  const newVideoObject = req.body.urls[0];

  if (!newVideoObject || !newVideoObject.url || !newVideoObject.handle) {
    return res.status(400).send({ message: "Invalid video data provided" });
  }
Video.findOneAndUpdate(
    {userId: id},
    {
      $push: { urls: newVideoObject },
      $setOnInsert: { userId: id },
    },
    { new: true, runValidators: true, upsert: true }
  )
    .then((updateVideo) => {
      res.status(200).send(updateVideo);
    })
    .catch((error) => {
    console.error("PATCH Error:", error);
      res.status(500).send({ message: "Internal server error." + error.code });
    });
});

// Delete Saved Video

videoRouter.delete("/:id/:url_id", (req, res) => {
  const { id, url_id } = req.params;
  const deleteUrl = Video.findOneAndUpdate(
    { userId: id },
    { $pull: { urls: { _id: url_id } } },
    { new: true }
  );
  deleteUrl
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "Video not found" });
      }
      res.status(200).send({
        message: "Successfully delete video from collection",
        updatedDocument: data,
      });
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

videoRouter.post("/merge-arrays", async (req, res) => {
  try {
    // 1. Get the IDs and the secret key from the request body.
    const { sourceId, targetId, secretKey } = req.body;

    // 2. SECURITY CHECK: Verify the secret key.
    if (secretKey !== process.env.MERGE_SECRET_KEY) {
      return res
        .status(401)
        .send({ message: "Unauthorized. Invalid secret key." });
    }

    if (!sourceId || !targetId) {
      return res
        .status(400)
        .send({ message: "Both sourceId and targetId are required." });
    }

    // 3. Find the source document to get its 'urls' array.
    const sourceDocument = await Video.findById(sourceId);
    if (
      !sourceDocument ||
      !sourceDocument.urls ||
      sourceDocument.urls.length === 0
    ) {
      return res.status(404).send({
        message: `Source document with ID ${sourceId} not found or has no URLs to move.`,
      });
    }
    const urlsToMove = sourceDocument.urls;

    // 4. Update the target document, pushing all URLs from the source.
    const updateResult = await Video.updateOne(
      { _id: targetId },
      { $push: { urls: { $each: urlsToMove } } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).send({
        message: `Target document with ID ${targetId} not found or was not updated.`,
      });
    }

    // 5. (Recommended) Clean up the source document by emptying its 'urls' array.
    await Video.updateOne({ _id: sourceId }, { $set: { urls: [] } });

    // 6. Send a success response.
    res.status(200).send({
      message: `Merge successful! Moved ${urlsToMove.length} videos.`,
      sourceId: sourceId,
      targetId: targetId,
      status: `The 'urls' array from ${sourceId} has been added to ${targetId}, and the source array has been emptied.`,
    });
  } catch (error) {
    console.error("Merge Error:", error);
    res.status(500).send({
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
});

module.exports = videoRouter;
