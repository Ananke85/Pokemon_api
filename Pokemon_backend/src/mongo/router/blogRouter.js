const express = require('express')

const { getAllPosts, getPostById, postBlogPost} = require("../controller/blogController")


const blogRouter = express.Router()

blogRouter.get("/", getAllPosts)
blogRouter.get("/:id", getPostById)
blogRouter.post("/", postBlogPost)


module.exports = blogRouter