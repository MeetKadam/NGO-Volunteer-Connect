const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/ngoAuth-controller");
const validate = require("../middlewares/validate-middleware");
const {signupSchema, loginSchema} = require("../validators/ngoAuth-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);
  router.route("/login").post(validate(loginSchema), authControllers.login);
//   const contactForm = require("../controllers/contact-controller");

// router.route("/newevent").post();

  router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;