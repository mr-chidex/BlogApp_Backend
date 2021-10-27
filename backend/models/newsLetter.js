const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcryptJs = require("bcryptjs");

const newsLetterSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
  },
  { timestamps: true }
);
