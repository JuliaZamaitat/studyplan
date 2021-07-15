const apiController = require("../controller/apiController"),
  router = require("express").Router();

router.get("/programs", apiController.programs);
router.get("/:program/:stupo", apiController.programWithStuPo);
router.get("/:program/:stupo/:course*", apiController.courseProgram);
router.get(
  "/:program/:stupo/:course*/semester/:semester",
  apiController.courseProgramWithSemester
);

module.exports = router;
