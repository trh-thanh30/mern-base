const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model("Comments", blogSchema);
module.exports = Blog;
