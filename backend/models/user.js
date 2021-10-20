const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcryptJs = require("bcryptjs");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "I am new",
  },
  isAdmin: { type: Boolean, default: false },
  image: {
    type: Object,
    default: null,
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcryptJs.genSalt(12);
    const hashedPassword = await bcryptJs.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(new Error(error));
  }
});

module.exports = mongoose.model("User", userSchema);
