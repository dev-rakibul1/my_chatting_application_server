const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minLength: 5,
      maxLength: 15,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      minLength: 5,
      maxLength: 30,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      require: true,
      minLength: 6,
      maxLength: 30,
    },

    profilePicture: {
      type: String,
      default: "",
    },

    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followersPeople: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
