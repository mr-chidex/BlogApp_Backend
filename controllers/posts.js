const Posts = require("../models/posts");
const User = require("../models/user");
const mongoose = require("mongoose");
const deleteImage = require("../handlers/deleteImage");
const { validationResult } = require("express-validator");
const io = require("../socket");

//@desc     get all post
//@Route    GET /api/posts/
//@access   Public
const getAllPosts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;
  const totalPost = await Posts.find().countDocuments();
  const posts = await Posts.find()
    .populate("author", "name -_id")
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .sort({ _id: -1 });

  res.json({ posts, totalPost });
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

  const post = await new Posts({
    title,
    content,
    image: req.file.path,
    author: req.user,
  });
  await post.save();

  io.getIO().emit("posts", { action: "CREATE_POST", post: post });

  const user = await User.findById(req.user._id);
  user.posts = [...user.posts, post];
  await user.save();

  res.status(201).json({ message: "post created successfully", post });
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

  deleteImage(post.image);

  await Posts.deleteOne({ _id: postId });

  io.getIO().emit("posts", { action: "DELETE_POST", post: post });

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
      .status(401)
      .json({ message: "Unauthorized access updating file" });

  post.title = title;
  post.content = content;
  if (req.file) {
    //delete old image
    deleteImage(post.image);
    post.image = req.file.path;
  }

  await post.save();

  io.getIO().emit("posts", { action: "UPDATE_POST", post: post });

  res.json({ message: "post updated successfully", post });
};

module.exports = {
  getAllPosts,
  addNewPost,
  getSinglePost,
  deletePost,
  updatePost,
};
