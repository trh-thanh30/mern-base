const express = require("express");
const verifyToken = require("../utils/verifyToken");
const {
  getBlogs,
  updateBlog,
  deleteBlog,
  postBlog,
} = require("../controller/blog.controller");
const router = express.Router();
router.get("/api/blogs", verifyToken, getBlogs);
router.put("/api/updateBlog/:id", verifyToken, updateBlog);
router.delete("/api/deleteBlog/:id", verifyToken, deleteBlog);
router.post("/api/postBlog", verifyToken, postBlog);
module.exports = router;
