const router = require("express").Router();
const mongoose = require("mongoose");
const postSchema = require("../models/Post");
const userSchema = require("../models/User");

// create a post models schema
const Post = new mongoose.model("Post", postSchema);

// create a User models
const User = new mongoose.model("User", userSchema);

// I will do create some post API and plain the before how can i work it.
/*
 * create a post
 * update a post
 * delete a post
 * like a post
 * get a post
 * get timeline posts
 */

// create a new post
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (post.userId === req.body.userId) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json({ message: "Post update successfully." });
    } else {
      res.status(403).json({ message: "You can only update your post." });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// update a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (post.userId === req.body.userId) {
      await Post.deleteOne({ $set: req.body });
      res.status(200).json({ message: "Post delete successfully." });
    } else {
      res.status(403).json({ message: "You can only delete your post." });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// like and disliked a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({ message: "Liked Success!" });
    } else {
      await post.updateOne({ $poll: { likes: req.body.userId } });
      res.status(200).json("Disliked Success!");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Get a timeline post
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
