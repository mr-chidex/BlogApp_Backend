const expressPromise = require("express-promise-router");
const router = expressPromise();

const { newsLetterVal } = require("../middlewares/validator");
const { authUser } = require("../middlewares/authUser");

const {
  subscribe,
  getSubscribers,
  delSubscribers,
} = require("../controllers/newsLetter");

router.route("/").post(newsLetterVal, subscribe).get(getSubscribers);

router.route("/:subId").delete(delSubscribers);

module.exports = router;
