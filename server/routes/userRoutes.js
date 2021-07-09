const userController = require("../controller/userController"),
  router = require("express").Router();

router.get("/confirmation/:token", userController.confirmation);

router.put(
  "/:id",
  userController.checkDuplicateUsernameOrEmail,
  userController.update
);

router.put("/:id/updatePassword", userController.updatePassword);

router.post("/login", userController.login);
router.post(
  "/register",
  userController.checkDuplicateUsernameOrEmail,
  userController.register,
  userController.sendVerificationEmail
);
router.post(
  "/resend",
  userController.resendToken,
  userController.sendVerificationEmail
);

module.exports = router;
