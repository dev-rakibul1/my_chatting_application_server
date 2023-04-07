const Post = require("../models/Post.model");
const UserRegister = require("../models/User.model");

// create a new post
exports.createANewPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const savePost = await newPost.save();

    res.status(200).json({
      status: true,
      message: "Post successfully!",
      data: savePost,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Post fail!",
      error: error.message,
    });
  }
};

// update post
exports.updateASinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById({ _id: id });

    if (post._id === id) {
      await Post.updateOne({ $set: req.body }, { runValidators: true });
      res.status(200).json({ message: "Post update successfully." });
    } else {
      res.status(403).json({ message: "You can only update your post." });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Post update fail!",
      error: error.message,
    });
  }
};

// delete post
exports.deleteASinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById({ _id: id });
    if (post._id === id) {
      await Post.deleteOne({ $set: req.body });
      res.status(200).json({ message: "Post delete successfully." });
    } else {
      res.status(403).json({ message: "You can only delete your post." });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Post delete fail!",
      error: error.message,
    });
  }
};

// line in the post
exports.likeASinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById({ _id: id });

    if (!post.likes.includes(id)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({ message: "Liked Success!" });
    } else {
      await post.updateOne({ $poll: { likes: req.body.userId } });
      res.status(403).json("Disliked Success!");
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Like fail!",
      error: error.message,
    });
  }
};

// get a single post
exports.getASinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Post.findById({ _id: id });

    if (!posts.length) {
      res.status(404).json({
        status: false,
        message: "Post not available!",
        post: posts,
      });
      return;
    }

    res.status(500).json({
      status: false,
      message: "Single post",
      post: post,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Post not available",
      error: error.message,
    });
  }
};

// get user all post
exports.getUserAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });

    if (!posts.length) {
      res.status(404).json({
        status: false,
        message: "Post not available!",
        post: posts,
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Post get successfully!",
      post: posts,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Post get fail!",
      error: error.message,
    });
  }
};

exports.userCommentsInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log(req.body);

    const comments = await Post.updateOne(
      { _id: id },
      { $push: { comments: req.body } },
      { new: true },
      { runValidators: true }
    );

    res.status(201).json({
      status: true,
      message: "Comment success!",
      comments: comments,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
      message: "Comment fail!",
      error: error.message,
    });
  }
};

// get timeline post all post
// exports.getUserTimelinePost = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const currentUser = await UserRegister.findById(req.params.userId);

//     const userPosts = await Post.find({ userId: currentUser._id });
//     const friendPosts = await Promise.all(
//       currentUser.followings.map((friendId) => {
//         return Post.find({ userId: friendId });
//       })
//     );
//     res.status(200).json(userPosts.concat(...friendPosts));
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };
