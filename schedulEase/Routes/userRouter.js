const express = require("express");
const userSchema = require("../Schemas/UserSchema");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/signup", (req, res) => {
  const { email, password, name, role } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const newUser = new userSchema({
        name: name,
        email: email,
        password: hash,
        role: role,
      });
      return newUser.save();
    })
    .then((user) => {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "100d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 100 * 24 * 60 * 1000,
      });
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." });
    });
});

userRouter.put("/:id", (req, res) => {
  const { password, oldPassword } = req.body;
  if (!oldPassword || !password) {
    return res
      .status(400)
      .send({ message: "Please provide both old and new password" });
  }
  if (password.length < 12) {
    return res
      .status(400)
      .send({ message: "New password must be at least 12 characters long" });
  }
  if (!req.params.id) {
    return res.status(403).send({
      message: "Unauthorized: You can only update your own password.",
    });
  }
  userSchema
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new Error("User not found.");
      }
      return bcrypt.compare(oldPassword, user.password).then((isMatch) => {
        if (!isMatch) {
          throw new Error("Current password incorrect.");
        }
        return bcrypt
          .hash(password, 10)
          .then((hashedPassword) => {
            user.password = hashedPassword;
            return user.save();
          })
          .then(() => {
            res.clearCookie("token");
            return res.status(200).send({ message: "Password updated" });
          });
      });
    })
    .catch((error) => {
      if (
        error.message === "User not found" ||
        error.message === "Current password incorrect"
      ) {
        return res.status(400).send({ message: error.message });
      }
      res
        .status(500)
        .send({ message: "Internal server error.", error: error.message });
    });
});

userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  userSchema
    .findOne({ email: email })
    .then((login) => {
      return bcrypt.compare(password, login.password).then((isMatched) => {
        if (!isMatched) {
          return res.status(400).send({ message: "Inavlid credentials." });
        }
        const token = jwt.sign({ id: login._id }, process.env.JWT_SECRET, {
          expiresIn: "100d",
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 100 * 24 * 60 * 6 * 1000,
        });
        return res
          .status(200)
          .send({ message: "User successfully login in", login });
      });
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." });
    });
});

userRouter.get("/:id", (req, res) => {
    const {id} = req.params
  userSchema
    .findOne({ _id: id })
    .then((user) => {
      if (!id) {
        return res
          .status(400)
          .send({ message: "Unable to retrieve authenticated user" });
      } else {
        return res.status(200).send(user);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error " + error.code });
    });
});

module.exports = userRouter;
