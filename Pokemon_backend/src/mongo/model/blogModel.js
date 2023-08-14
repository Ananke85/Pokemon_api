const { model } = require("mongoose");

const blogSchema = require("../schema/blogSchema");
const blogModel = model("blog", blogSchema);

module.exports = blogModel;
