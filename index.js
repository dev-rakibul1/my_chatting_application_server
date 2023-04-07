const app = require("./app");
const database = require("./utility/database");
require("dotenv").config();
const port = process.env.PORT || 8800;

// database
database;

app.get("/", (req, res) => {
  res.send("Welcome chat application");
});

app.all("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "route is not found!",
  });
});

app.listen(port, async () => {
  console.log("Backend server is running", port);
});
