const express = require("express");
const app = express();
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

// api
const postRouter = require("./routes/posts.router");

// middle ware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

// app.use("/api/v1/users", userRoute);
// app.use("/api/v1/auth", userAuth);
app.use("/api/v1/posts", postRouter);

module.exports = app;
