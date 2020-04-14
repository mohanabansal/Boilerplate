const express = require("express");
const router = express.Router();
const { User } = require("../db");

router.get('/', async(req, res, next) => {
  try {
    const data = await User.findAll();
    res.json(data)
  } catch (error) {
    next(error)
  }
})
router.get("/login", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.id);
    if (!user) {
      res.status(401).send("User not found!");
    } else if (!user.hasMatchingPassword(req.body.password)) {
      res.status(401).send("Incorrect password!");
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    if (user) {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
