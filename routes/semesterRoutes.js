const semesterController = require("../controller/semesterController"),
  router = require("express").Router();

router.get("/", semesterController.index);

module.exports = router;
