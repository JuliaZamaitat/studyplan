const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  apiRoutes = require("./apiRoutes"),
  studyPlanRoutes = require("./studyPlanRoutes");

router.use("/api", apiRoutes);
router.use("/users", userRoutes);
router.use("/studyplan", studyPlanRoutes);

module.exports = router;
