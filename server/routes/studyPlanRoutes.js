const studyPlanController = require("../controller/studyPlanController"),
  router = require("express").Router();

router.get("/:id", studyPlanController.show);
router.put("/:id", studyPlanController.update);

module.exports = router;
