// async await system handle database
const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();

const database = mongoose
  .connect(process.env.MY_CHAT_LOCAL_SERVER)
  .then(() => {
    console.log("Database is connected!".bgGreen.black);
  })
  .catch((error) => console.log(error.message).bgRed.black);

module.exports = database;
