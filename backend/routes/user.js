const expressPromise = require("express-promise-router");
const router = expressPromise();

const {
  userSignupValidator,
  userSignInValidator,
  updateProfileVal,
  passwordVal,
} = require("../middlewares/validator.js");
const {
  signUp,
  signIn,
  changePassword,
  updateProfile,
} = require("../controllers/user");
const imageUpload = require("../middlewares/multer");
const { authUser } = require("../middlewares/authUser");

router.route("/signup").post(userSignupValidator, signUp);
router.route("/signin").post(userSignInValidator, signIn);
router
  .route("/profile")
  .put(imageUpload.single("image"), authUser, updateProfileVal, updateProfile);
router.route("/password").put(authUser, passwordVal, changePassword);

module.exports = router;
