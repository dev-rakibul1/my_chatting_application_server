const router = require("express").Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = require("../models/User");

// create a User models
const User = new mongoose.model("User", userSchema);

// I will do create some post API and plain the before how can i work it.
/*
 * update user
 * delete user
 * get a user
 * follow a user
 * unfollow a user
 *
 */

// Update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    try {
      await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account update successfully!");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res.status(403).json("message: You can only update your account!");
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json("Account delete successfully!");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  } else {
    return res.status(403).json("message: You can only delete your account!");
  }
});

// get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });

    // for stop unnecessary data
    const { password, updatedAt, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

// follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById({ _id: req.params.id });
      const currentUser = await User.findById({ _id: req.body.userId });

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({ message: "Following successfully" });
      } else {
        res.status(403).json({ message: "You already following this user" });
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(403).json({ message: "You can not following yourself" });
  }
});

// unFollow user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById({ _id: req.params.id });
      const currentUser = await User.findById({ _id: req.body.userId });

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({ message: "User has been unfollowing" });
      } else {
        res.status(403).json({ message: "You are not following this user" });
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(403).json({ message: "You can not unfollowing yourself" });
  }
});

module.exports = router;
