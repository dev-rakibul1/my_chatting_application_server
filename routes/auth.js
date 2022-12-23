const router = require("express").Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = require("../models/User");

const User = new mongoose.model("User", userSchema);

//=============================OUR APPLICATION ALL POST METHOD HERE=========================
// Register API
router.post("/register", async (req, res) => {
  try {
    // password new generate
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    // save user and response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// =====================LOGIN API=====================
router.post("/login", async (req, res) => {
  try {
    // user email check
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("message: Invalid user");

    // user password check
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !passwordCheck && res.status(404).json("message: wrong password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
