const Blog = require("../models/blog.model");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (!blogs) {
      return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const postBlog = async (req, res) => {
  try {
    const { content } = req.body;
    const { id, username } = req.user;
    const newBlog = await Blog.create({
      userName: username,
      content,
      userId: id,
    });
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { content } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this blog" });
    }
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog" });
    }
    res.status(200).json({ message: "Blog deleted successfully", blog });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = { getBlogs, updateBlog, deleteBlog, postBlog };
