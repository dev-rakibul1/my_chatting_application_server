const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 15,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 30,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 64,
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
    followings: {
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
    desc: {
      type: String,
      maxLength: 80,
    },
    city: {
      type: String,
      maxLength: 40,
      trim: true,
    },
    from: {
      type: String,
      maxLength: 40,
      trim: true,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
