const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  apiRoutes = require("./apiRoutes"),
  studyPlanRoutes = require("./studyPlanRoutes"),
  semesterRoutes = require("./semesterRoutes");

router.use("/api", apiRoutes);
router.use("/users", userRoutes);
router.use("/studyplan", studyPlanRoutes);
router.use("/semesters", semesterRoutes);

module.exports = router;
