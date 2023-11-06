const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("./users");
const { SALT } = require("../utils/constants");
const fs = require("fs");

const router = express.Router();

router.use("*", (req, res, next) => {
  if (req.headers.token) {
    jwt.verify(req.headers.token, SALT, (err, store) => {
      if (err) {
        req.loggedUser = null;
        delete req.loggedUser;
      } else {
        req.loggedUser = store;
      }
    });
  }
  next();
});

router.get("/", (req, res) => {
  fs.readFile(__dirname + "/../../package.json", function (err, data) {
    const package = JSON.parse(data.toString());
    res
      .status(200)
      .end(`API Service v${package.version} is ready.`);
  });
});

router.use("/users", users);

module.exports = router;
