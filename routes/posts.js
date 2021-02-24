const expressPromise = require("express-promise-router");
const router = expressPromise();

const { postValidator } = require("../middlewares/validator");
const { authUser } = require("../middlewares/authUser");

const {
  addNewPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/posts");
const imageUpload = require("../middlewares/multer");

router.route("/").get(getAllPosts);

router
  .route("/")
  .post(imageUpload.single("image"), authUser, postValidator, addNewPost);
router
  .route("/:postId")
  .get(getSinglePost)
  .put(imageUpload.single("image"), authUser, postValidator, updatePost)
  .delete(authUser, deletePost);

module.exports = router;
