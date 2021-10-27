const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const NewsLetter = require("../models/newsLetter");

//@desc    subscribe to news letter
//@Route    POST /api/user/news-letter
//@access   Public
exports.subscribe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.array()[0].msg,
    });
  }
  const { email } = req.body;

  const subcriber = await NewsLetter.findOne({ email });
  if (subcriber)
    return res.status(422).json({ message: "E-Mail already subscribed" });

  const newSubscriber = await new NewsLetter({ email });

  await newSubscriber.save();

  res.status(201).json({ message: "success", subcriber: newSubscriber });
};

//@desc   get news letter subscribers
//@Route    GET /api/user/news-letter
//@access   Private
exports.getSubscribers = async (req, res) => {
  const page = +req.query.page || 0;
  const limit = +req.query.limit || 10;
  const totalCount = await NewsLetter.find().countDocuments();
  const result = {};
  const startIndex = page * limit;
  result.totalCount = totalCount;
  result.countPerPage = limit;

  result.data = await NewsLetter.find()
    .skip(startIndex)
    .limit(limit)
    .sort({ _id: -1 });

  res.json({ result });
};

//@desc   delete news letter subscriber
//@Route    DELETE /api/user/news-letter/:subId
//@access   Private
exports.delSubscribers = async (req, res) => {
  const subId = req.params.subId;
  if (!subId) return res.status(400).json({ message: "No subscriber Id" });

  if (!mongoose.isValidObjectId(subId))
    return res.status(400).json({ message: "Invalid subscriber Id" });

  const subscriber = await NewsLetter.findById(subId);

  if (!subscriber)
    return res.status(404).json({ message: "subscriber not found" });

  await NewsLetter.deleteOne({ _id: subId });
  res.status(204).json({ message: "success" });
};
