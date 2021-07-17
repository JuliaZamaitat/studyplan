const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  apiRoutes = require("./apiRoutes"),
  studyPlanRoutes = require("./studyPlanRoutes"),
  semesterRoutes = require("./semesterRoutes"),
  userController = require("../controller/userController");

router.use("/users", userRoutes);

router.use(userController.verifyToken);
router.use("/api", apiRoutes);
router.use("/studyplan", studyPlanRoutes);
router.use("/semesters", semesterRoutes);

module.exports = router;
