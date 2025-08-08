const userSchema = require("../Schemas/UserSchema");
const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Create User

userRouter.post("/", (req, res) => {
  const { email, password, role, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const newUser = new userSchema({
        email: email,
        password: hash,
        role: role,
        name: name,
      });
      return newUser.save();
    })
    .then((user) => {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "100d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_SECRET === "production",
        sameSite: "strict",
        maxAge: 100 * 24 * 60 * 1000,
      });
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error." });
    });
});

// Update user

userRouter.put("/:id", (req, res) => {
  const { password, oldpassword } = req.body;
  userSchema.findById(req.params.id).then((user) => {
    if (!user) {
      throw new Error("User not found.")
    }
    return bcrypt.compare(oldpassword, user.password).then((isMatch) => {
      if(!isMatch){
        throw new Error("Current password incorrect")
      }
      return bcrypt.hash(password, 10).then((hashedpassword) => {
        user.password = hashedpassword
        return user.save()
      })
      .then(()=>{
        res.clearCookie("token")
        return res.status(200).send({message: "Password updated"})
      })
    })
  });
});

// Retrieve all users

userRouter.get("/", (req, res) => {
  const users = userSchema.find({});
  users
    .then((users) => {
      if (!users) {
        res.status(400).send({ message: "No users to retrieve" });
      } else {
        res.status(200).send(users);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error" });
    });
});

// Retrieve a user

userRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = userSchema.find({ _id: id });

  user
    .then((user) => {
      if (!id) {
        res.status(400).send({ message: "Unable to retrieve user without ID" });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((error) => {
      res.status(500).send({ message: "Internal server error" });
    });
});

// Delete a user

userRouter.delete("/:id", (req, res) => {
  
})

module.exports = userRouter;
