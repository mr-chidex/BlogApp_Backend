const expressPromise = require("express-promise-router");
const router = expressPromise();

const {
  userSignupValidator,
  userSignInValidator,
} = require("../middlewares/validator.js");
const { signUp, signIn } = require("../controllers/user");

router.route("/signup").post(userSignupValidator, signUp);
router.route("/signin").post(userSignInValidator, signIn);
// router.route("/signin").post(signUp);
// router.route("/signup").post(signUp);

module.exports = router;
