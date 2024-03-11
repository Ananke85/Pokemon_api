const blogModel = require("../model/blogModel");

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await blogModel.find();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: "Can't find posts" });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const postById = await blogModel.findById(id).exec();
    res.status(200).json(postById);
  } catch (error) {
    res.status(500).json({ message: "Sorry, can't find this post" });
  }
};

const postBlogPost = async (req, res) => {
  const { body } = req;
  try {
    const newBlogPost = new blogModel(body);
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(500).json({ message: "Sorry, can't post this blogpost" });
  }
};


module.exports = {
  getAllPosts,
  getPostById,
  postBlogPost
};