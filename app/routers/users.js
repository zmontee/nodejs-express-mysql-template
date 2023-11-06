const express = require("express");
const md5 = require('md5')
const Table = require("../db");
const jwt = require('jsonwebtoken');
const {SALT} = require("../utils/constants");

const router = express.Router;
const Users = new Table('users');

router.put('/auth', async (req, res) => {
  const login = req.body.login;
  const password = md5(req.body.password + SALT);

  try {
    const user = await Users.get({ login, password }); // search user by login & password
    if (user.available === 1) {
      const token = jwt.sign({ id: user.id, role: user.role }, SALT); // generate token
      delete user.password;
      res.status(200).json({ token, user });
    } else {
      res.status(423).end();
    }
  } catch (e) {
    // no such user
    res.status(403).end();
  }
});

router.get('/verify', async (req, res) => {
  const token = req.query.token || req.headers.token;
  jwt.verify(token, SALT, async (err, store) => {
    if (err) {
      res.status(401).end();
    } else {
      const { id = 0 } = store;
      try {
        const user = await Users.get({ id });
        delete user.password;
        if (user.available === 0) {
          res.status(403).end();
        } else {
          res.status(200).json(user);
        }
      } catch (e) {
        res.status(401).end();
      }
    }
  });
});

module.exports = router;