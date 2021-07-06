const userController = require("../controller/userController"),
  router = require("express").Router();

router.put("/:id", userController.update);

router.post("/login", userController.login);
router.post(
  "/register",
  userController.checkDuplicateUsernameOrEmail,
  userController.register
);

module.exports = router;
