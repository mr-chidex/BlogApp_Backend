const Posts = require("../models/posts");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const slugify = require("slugify");

const cloudinary = require("../utils/cloudinary");
const folderPath = require("../utils/folder");

//@desc     get all post
//@Route    GET /api/posts/
//@access   Public
const getAllPosts = async (req, res, next) => {
  const page = +req.query.page || 0;
  const limit = +req.query.limit || 10;
  const totalCount = await Posts.find().countDocuments();
  const result = {};
  const startIndex = page * limit;
  result.totalCount = totalCount;
  result.countPerPage = limit;

  result.data = await Posts.find()
    .populate("author", "name -_id")
    .skip(startIndex)
    .limit(limit)
    .sort({ _id: -1 });

  res.json({ result });
};

const searchPost = async (req, res, next) => {
  const { q } = req.query;
  if (!q)
    return res
      .status(422)
      .json({ messgae: "no query provided", status: "error" });

  const page = +req.query.page || 0;
  const limit = +req.query.limit || 10;
  const totalCount = await Posts.find({
    $text: { $search: q },
  }).countDocuments();
  const result = {};
  const startIndex = page * limit;
  result.totalCount = totalCount;
  result.countPerPage = limit;

  result.data = await Posts.find({ $text: { $search: q } })
    .populate("author", "name -_id")
    .skip(startIndex)
    .limit(limit)
    .sort({ _id: -1 });

  res.json({ result });
};

//@desc     get all post by author
//@Route    GET /api/posts/
//@access   Public
const getAllPostByAuthor = async (req, res, next) => {
  const page = +req.query.page || 0;
  const limit = +req.query.limit || 10;
  const totalCount = await Posts.find({
    author: req?.user?._id,
  }).countDocuments();
  const result = {};
  const startIndex = page * limit;
  result.totalCount = totalCount;
  result.countPerPage = limit;

  result.data = await Posts.find({ author: req?.user?._id })
    .populate("author", "name -_id")
    .skip(startIndex)
    .limit(limit)
    .sort({ _id: -1 });

  res.json({ result });
};

//@desc     add new post
//@Route    POST /api/posts/:postId
//@access   private
const addNewPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.array()[0].msg,
    });
  }
  const { title, content } = req.body;

  if (!req.file) return res.status(400).json({ message: "No image uploaded" });

  try {
    const image = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: folderPath,
    });

    const post = new Posts({
      title,
      content,
      image: {
        url: image.secure_url,
        image_id: image.public_id?.split("/")[2],
      },
      author: req.user,
      url: slugify(title, { lower: true, strict: true }),
    });

    await post.save();

    res.status(201).json({ message: "post created successfully", post });
  } catch (error) {
    res
      .status(503)
      .json({ message: "error uploading image. Check network and try again" });
  }
};

//@desc     get single post
//@Route    GET /api/posts/
//@access   Public
const getSinglePost = async (req, res, next) => {
  const postId = req.params.postId;
  if (!postId) return res.status(400).json({ message: "No post Id" });

  if (!mongoose.isValidObjectId(postId))
    return res.status(400).json({ message: "Invalid post Id" });

  const post = await Posts.findById(postId).populate("author", "name -_id");

  res.json({ post });
};

//@desc     delete post
//@Route    DELETE /api/posts/:postId
//@access   private
const deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  if (!postId) return res.status(400).json({ message: "No post Id" });

  if (!mongoose.isValidObjectId(postId))
    return res.status(400).json({ message: "Invalid post Id" });

  const post = await Posts.findById(postId);

  if (!post) return res.status(404).json({ message: "post not found" });

  if (post.author.toString() !== req.user._id.toString())
    return res
      .status(401)
      .json({ message: "Unauthorized access deleting file" });

  try {
    await cloudinary.v2.uploader.destroy(
      `${folderPath}/${post.image.image_Id}`
    );
  } catch (error) {
    return res
      .status(503)
      .json({ message: "error deleting image. Check network and try again." });
  }

  await Posts.deleteOne({ _id: postId });
  res.json({ message: "post deleted successfully" });
};

//@desc     update post
//@Route    PUT /api/posts/:postId
//@access   private
const updatePost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.array()[0].msg,
    });
  }

  const postId = req.params.postId;
  const { title, content } = req.body;

  if (!postId) return res.status(400).json({ message: "No post Id" });

  if (!mongoose.isValidObjectId(postId))
    return res.status(400).json({ message: "Invalid post Id" });

  const post = await Posts.findById(postId).populate("author", "name _id");

  if (!post) return res.status(404).json({ message: "post not found" });

  if (post.author._id.toString() !== req.user._id.toString())
    return res
      .status(403)
      .json({ message: "Unauthorized access updating file" });

  post.title = title;
  post.content = content;
  post.url = slugify(title, { lower: true, strict: true });

  if (req.file) {
    await cloudinary.v2.uploader.destroy(
      `${folderPath}/${post.image.image_Id}`
    );

    const image = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: folderPath,
    });

    post.image = {
      url: image.secure_url,
      image_id: image.public_id?.split("/")[2],
    };
  }

  await post.save();

  res.json({ message: "post updated successfully", post });
};

module.exports = {
  getAllPosts,
  addNewPost,
  getSinglePost,
  deletePost,
  updatePost,
  getAllPostByAuthor,
  searchPost,
};
