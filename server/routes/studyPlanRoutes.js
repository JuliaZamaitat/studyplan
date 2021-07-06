const studyPlanController = require("../controller/studyPlanController"),
  router = require("express").Router();

router.post("/create", studyPlanController.create);
router.post("/save", studyPlanController.saveToUser);

router.get("/:id", studyPlanController.show);
router.put("/:id", studyPlanController.update);

module.exports = router;
