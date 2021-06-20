const userController = require("../controller/userController"),
  router = require("express").Router();

router.get("/", userController.index);

module.exports = router;
