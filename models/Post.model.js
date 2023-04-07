const mongoose = require("mongoose");

// create our user post schema ans some validation here
const postSchema = mongoose.Schema(
  {
    description: {
      type: String,
      maxLength: 1500,
      required: [true, "Description is required!"],
    },
    image: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Posts", postSchema);
module.exports = Post;
