const { validationResult } = require("express-validator");
const bcryptJs = require("bcryptjs");

const cloudinary = require("../utils/cloudinary");
const folderPath = require("../utils/folder");

const User = require("../models/user");
const { getToken } = require("../middlewares/token");

//@desc     Signup new user
//@Route    POST /api/users/signup
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
//@Route  POST /api/users/signin
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

  res.json({ token });
};

//@Route - PUT /api/users/password
//@Access - Private
//@Description - change password
const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ message: errors.array()[0].msg });

  const user = req.user;

  user.password = req.body.password;

  await user.save();

  res.json({ message: "password updated" });
};

//@Route - PUT /api/users/profile
//@Access - Private
//@Description - update profile
const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ message: errors.array()[0].msg });

  const user = req.user;

  user.name = req.body.name;

  if (user.email === req.body.email) {
    user.email = req.body.email;
  } else {
    const isEmail = await User.findOne({ email });
    if (isEmail)
      return res.status(422).json({ message: "E-Mail already exist" });
    user.email = req.body.email;
  }

  if (req.file) {
    if (user.image) {
      if (req.file.size > 700000)
        return res
          .status(422)
          .json({ message: "image size too large, max 700kb" });

      await cloudinary.v2.uploader.destroy(
        `${folderPath}/${user.image.image_Id}`
      );

      const image = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: folderPath,
      });

      user.image = {
        url: image.secure_url,
        image_id: image.public_id.split("/")[1],
      };
    } else {
      if (req.file.size > 700000)
        return res
          .status(422)
          .json({ message: "image size too large, max 700kb" });

      const image = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: folderPath,
      });

      user.image = {
        url: image.secure_url,
        image_id: image.public_id.split("/")[1],
      };
    }
  }

  await user.save();

  const token = getToken(user);

  res.json({
    token,
    message: "updated",
  });
};

module.exports = { signUp, signIn, updateProfile, changePassword };
