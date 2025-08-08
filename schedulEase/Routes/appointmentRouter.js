const express = require("express");
const appointmentRouter = express.Router();
const appointmentSchema = require("../Schemas/AppointmentSchema.js");
const serviceSchema = require("../Schemas/ServiceSchema");
const userSchema = require("../Schemas/UserSchema.js");
const availabilityRouter = require("./availabilityRouter.js");

appointmentRouter.post("/", (req, res) => {
  let foundBusinessOwner;
  const {
    service,
    businessOwner,
    client,
    date,
    startTime,
    endTime,
    status,
    clientNotes,
    paymentStatus,
    stripeChargeId,
  } = req.body;
  if (
    // !service &&
    !businessOwner &&
    !client &&
    !date &&
    !startTime &&
    !endTime
  ) {
    res.status(400).send({ message: "Must complete these fields to continue" });
  }
  const user = userSchema;
  user
    .findById({ _id: businessOwner })
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: "User does not exist" });
      }
      foundBusinessOwner = user;
      return serviceSchema.findById(service);
    })
    .then((serviceDoc) => {
      if (!serviceDoc) {
        return res.status(400).send({ message: "Service does not exist" });
      }
      foundService = serviceDoc;
      return userSchema.findById(client);
    })
    .then((clientUser) => {
      if (!clientUser) {
        res.status(400).send("Invalid client ID or client does not exist");
      }
      const newAppointment = new appointmentSchema({
        service: service,
        businessOwner: businessOwner,
        client: client,
        date: new Date(date),
        startTime: startTime,
        endTime: endTime,
        status: status || "pending",
        clientNotes: clientNotes || "",
        paymentStatus: paymentStatus || "pending",
        stripeChargeId: stripeChargeId || null,
      });
      return newAppointment.save();
    })
    .then((savedAppointment) => {
      if (!savedAppointment) {
        return res.status(400).send({ message: "Appointment not created." });
      } else {
        return res.status(200).send(savedAppointment);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." + error });
    });
});

appointmentRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  const updateAppointment = appointmentSchema.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true, runValidators: true }
  );
  updateAppointment
    .then((update) => {
      if (!update) {
        res
          .status(400)
          .send({ message: "Unable to update appointment. Try again." });
      } else {
        res.status(200).send(update);
      }
    })
    .catch((error) => {
      res.status({ message: "Internal server error." + error.code });
    });
});

appointmentRouter.get("/", (req, res) => {
  appointmentSchema
    .find({})
    .then((appointments) => {
      if (!appointments) {
        res.status(400).send({ message: "Unable to retrieve appointments" });
      } else {
        res.status(200).send(appointments);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error" + error.code });
    });
});

appointmentRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  appointmentSchema
    .findById({ _id: id })
    .then((appointment) => {
      if (!id) {
        res
          .status(400)
          .send({ message: "Unable to retrieve record without ID" });
      } else {
        res.status(200).send(appointment);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." + error.code });
    });
});

appointmentRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  appointmentSchema
    .findByIdAndDelete({ _id: id })
    .then((appointment) => {
      if (!id) {
        res.status(400).send({ message: "Unable to delete record without ID" });
      } else {
        res.status(200).send("Appointment with ID " + appointment._id + " has been deleted.");
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error" + error.code });
    });
});

module.exports = appointmentRouter;
