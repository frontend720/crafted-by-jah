const express = require("express");
const availabilityRouter = express.Router();
const availablitySchema = require("../Schemas/AvailabilitySchema.js");
const userSchema = require("../Schemas/UserSchema.js");

availabilityRouter.post("/", (req, res) => {
  const { businessOwner, dayOfWeek, startTime, endTime } = req.body;
  if (!businessOwner || !dayOfWeek || !startTime || !endTime) {
    return res.status(400).send({ message: "All fields must be completed" });
  }
  const user = userSchema;
  user.findOne({ _id: req.body.businessOwner }).then((user) => {
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }
    const newAvailability = new availablitySchema(req.body);
    newAvailability
      .save()
      .then((schedule) => {
        if (!schedule) {
          return res.status(400).send({ message: "Schedule not created" });
        } else {
          return res.status(200).send(schedule);
        }
      })
      .catch((error) => {
        return res
          .status(400)
          .send({ message: "Internal server error" + error.code });
      });
  });
});

availabilityRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  const updateAvailablity = availablitySchema.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true, runValidators: true }
  );
  updateAvailablity
    .then((update) => {
      if (!update) {
        res
          .status(400)
          .send({ message: "Unable to update availability. Try again" });
      } else {
        res.status(200).send(update);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error" + error });
    });
});

availabilityRouter.get("/", (req, res) => {
  const getRecords = availablitySchema.find({});
  getRecords
    .then((record) => {
      if (record.length === 0) {
        res.status(400).send({ message: "No records to retrieve" });
      } else {
        res.status(200).send(record);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error" + error.code });
    });
});

availabilityRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const getRecord = availablitySchema.findById({ _id: id });
  getRecord
    .then((record) => {
      if (!id) {
        res
          .status(400)
          .send({ message: "Unable to retrieve record without ID" });
      } else {
        res.status(200).send(record);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." + error.code });
    });
});

availabilityRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleteRecord = availablitySchema.findByIdAndDelete({ _id: id });
  deleteRecord
    .then((record) => {
      if (!id) {
        res.status(400).send({ message: "Unable to delete record without ID" });
      } else {
        res
          .status(200)
          .send("Record with ID " + record._id + " has been removed.");
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error. " + error.code });
    });
});

module.exports = availabilityRouter;
