const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const newsLetterSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewsLetter", newsLetterSchema);
