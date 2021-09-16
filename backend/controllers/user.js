const { validationResult } = require("express-validator");
const bcryptJs = require("bcryptjs");

const User = require("../models/user");
const { getToken } = require("../middlewares/token");

//@desc     Signup new user
//@Route    POST /api/user/signup
//@access   Public
const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.array()[0].msg,
    });
  }
  const { email, name, password } = req.body;

  const user = await User.findOne({ email });
  if (user) return res.status(422).json({ message: "E-Mail already exist" });

  const newUser = await new User({
    name,
    email,
    password,
  });

  await newUser.save();
  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    _id: newUser._id,
    status: newUser.status,
  });
};

//@desc   Signin users
//@Route  POST /api/user/signin
//@access  Public
const signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.array()[0].msg,
    });
  }
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res
      .status(400)
      .json({ message: "email or password does not exist" });

  const isMatch = await bcryptJs.compare(password, user.password);

  if (!isMatch)
    return res
      .status(400)
      .json({ message: "email or password does not exist" });

  const token = getToken(user);

  res.json({
    name: user.name,
    email: user.email,
    token: `Bearer ${token}`,
    status: user.status,
  });
};

module.exports = { signUp, signIn };
