const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("log in");
});


router.get("/users", function (req, res) {
  res.send("get all users");
});

module.exports = router;