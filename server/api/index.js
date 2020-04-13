const router = require("express").Router();

//404 error

router.use(function(req, res, next) {
  const error = new Error("Not found!");
  // error.status(404);
  next(error);
});

module.exports = router;
