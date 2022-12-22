const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hey this is user route");
});

module.exports = router;
