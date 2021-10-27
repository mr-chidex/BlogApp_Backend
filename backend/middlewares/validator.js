const { body } = require("express-validator");

const postValidator = [
  body("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("title should be minimum of three characters"),
  body("content")
    .trim()
    .isLength({ min: 5 })
    .withMessage("content should be minimum of five characters"),
];

const userSignupValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("name should be minimum of three characters"),
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 4 })
    .withMessage("password should be minimum of four characters"),
];

const userSignInValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
];

const newsLetterVal = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
];

const passwordVal = [
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 4 })
    .withMessage("password should be minimum of four characters"),
];

const updateProfileVal = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("name should be minimum of three characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
];

module.exports = {
  postValidator,
  userSignupValidator,
  userSignInValidator,
  newsLetterVal,
  passwordVal,
  updateProfileVal,
};
