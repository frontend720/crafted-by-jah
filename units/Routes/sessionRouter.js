const express = require("express");
const sessionRouter = express.Router();
const sessionSchema = require("../Schemas/SessionSchema");
const userSchema = require("../Schemas/UserSchema");

sessionRouter.post("/", (req, res) => {
    const date = new Date('2025-08-01T00:00:00.000Z')
  const {
    traineeReference,
    trainerReference,
    startTime,
    endTime,
    unitsRedeemed,
    status,
    notes,
  } = req.body;
  userSchema
    .findOne({ _id: traineeReference })
    .then((session) => {
      if (!traineeReference) {
        res.status(400).send({
          message:
            "Unable to create session without an account. Contact instructor for access!",
        });
      }
      const newSession = new sessionSchema({
        traineeReference: req.body.traineeReference,
        trainerReference: req.body.trainerReference,
        unitsRedeemed: unitsRedeemed,
        status: status,
        notes: notes,
        startTime: date,
        endTime: date
      });
      newSession.save().then((session) => {
        if (!session._id) {
          res.status(400).send({ message: "Unable to create session ID" });
        } else {
          res.status(200).send(session);
        }

      });
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." });
    });
});

module.exports = sessionRouter;
