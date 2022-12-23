const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();
const port = process.env.PORT || 8800;

// extra user
const userRoute = require("./routes/users");
const userAuth = require("./routes/auth");

// mongoose.connect(
//   process.env.MONGO_CONNECTION_SHELL,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log("Connected MongoDB!");
//   }
// );

// async await system handle database
const databaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/chat_application");
    console.log("Database connection is successfully");
  } catch (e) {
    console.log("Database is not connected!");
    console.log(e.message);
    process.exit(1);
  }
};

// middle ware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", userAuth);

app.get("/", (req, res) => {
  res.send("Welcome chat application");
});

app.get("/users", (req, res) => {
  res.send("Welcome users");
});

app.listen(port, async () => {
  console.log("Backend server is running", port);
  await databaseConnection();
});
