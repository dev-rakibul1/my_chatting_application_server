const auth = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register API
auth.post("/register", async (req, res) => {
  try {
    // password new generate
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // save user and response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// =====================LOGIN API=====================
auth.post("/login", (req, res) => {});

module.exports = auth;
