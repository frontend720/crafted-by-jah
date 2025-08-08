const express = require("express");
const serviceRouter = express.Router();
const serviceSchema = require("../Schemas/ServiceSchema");
const userSchema = require("../Schemas/UserSchema.js");

serviceRouter.post("/", (req, res) => {
  const { name, description, duration, price, businessOwner } = req.body;
  if (!name && !description && !duration && !price && !businessOwner) {
    res
      .status(400)
      .send({ message: "All required fields must be completed to continue" });
  }
  const user = userSchema;
  user.findOne({ _id: businessOwner }).then((user) => {
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }
    const newService = new serviceSchema(req.body);
    newService
      .save()
      .then((service) => {
        if (!service) {
          return res.status(400).send({ message: "Service not created" });
        } else {
          return res.status(200).send(service);
        }
      })
      .catch((error) => {
        return res
          .status(500)
          .send({ message: "Internal server error" + error.code });
      });
  });
});

//Retrieve all Documents
serviceRouter.get("/list", (req, res) => {
  serviceSchema
    .find({})
    .then((services) => {
      if (!services) {
        res.status(400).send({ message: "No records to retrieve" });
      } else {
        res.status(200).send(services);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error" });
    });
});

serviceRouter.get("/:id", (req, res) => {
  const { id } = req.params;
    if (!id) {
    return res.status(400).send({ message: "Service ID is required" });
  }
  serviceSchema
    .findById({ _id: id })
    .then((service) => {
      if (!id) {
        return res.status(400).send({ message: "No record to retrieve" });
      } else {
        return res.status(200).send(service);
      }
    })
    .catch((error) => {
      res.status({ message: "Internal server error" + error });
    });
});

serviceRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  const updateService = serviceSchema.findByIdAndUpdate(
    id,
    {
      $set: req.body,
    },
    { new: true, runValidators: true }
  );
  updateService
    .then((update) => {
      if (!update) {
        res.status(400).send({ message: "Can't update service without ID" });
      } else {
        res.status(200).send(update);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error" + error.code });
    });
});

serviceRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  serviceSchema
    .findByIdAndDelete({ _id: id })
    .then((service) => {
      if (!service) {
        res
          .status(400)
          .send({ message: "Unable to delete service without ID" });
      } else {
        res.status(200).send("Service with ID " + service._id + " deleted.");
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error" + error.code });
    });
});

module.exports = serviceRouter;
