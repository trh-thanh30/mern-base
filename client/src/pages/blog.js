/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [content, setContent] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [offContent, setOffContent] = useState(false);
  const username = JSON.parse(window.localStorage.getItem("userName"));
  const userId = JSON.parse(window.localStorage.getItem("userId"));
  const token = window.localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/blog/api/postBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          content,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setContent("");
        console.log(data.message);
        setBlogs([...blogs, data.blog]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3001/blog/api/deleteBlog/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data);
      }
      if (res.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:3001/blog/api/blogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data);
        }
        if (res.ok) {
          setBlogs(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);
  const handleEditClick = (blog) => {
    setIsEditing(blog._id);
    setEditContent(blog.content);
    setOffContent(true);
  };
  const handleEdit = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3001/blog/api/updateBlog/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: editContent,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
      if (res.ok) {
        setIsEditing(null);
        setOffContent(false);
        setBlogs(
          blogs.map((blog) =>
            blog._id === id ? { ...blog, content: editContent } : blog
          )
        );
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsEditing(null);
    setOffContent(false);
  };
  return (
    <>
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Blog
            </h2>
            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              We use an agile approach to test assumptions and connect with the
              needs of your audience early and often.
            </p>
          </div>
          <div class="grid gap-8 lg:grid-cols-2">
            <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div class="flex justify-between items-center mb-5 text-gray-500">
                <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  <svg
                    class="mr-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                  </svg>
                  Tutorial
                </span>
                <span class="text-sm">14 days ago</span>
              </div>
              <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">How to quickly deploy a static website</a>
              </h2>
              <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
                Static websites are now used to bootstrap lots of websites and
                are becoming the basis for a variety of tools that even
                influence both web designers and developers influence both web
                designers and developers.
              </p>
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                  <img
                    class="w-7 h-7 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    alt="Jese Leos avatar"
                  />
                  <span class="font-medium dark:text-white">Jese Leos</span>
                </div>
                <a
                  href="#"
                  class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Read more
                  <svg
                    class="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </article>
            <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div class="flex justify-between items-center mb-5 text-gray-500">
                <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  <svg
                    class="mr-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      clip-rule="evenodd"
                    ></path>
                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                  </svg>
                  Article
                </span>
                <span class="text-sm">14 days ago</span>
              </div>
              <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">Our first project with React</a>
              </h2>
              <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
                Static websites are now used to bootstrap lots of websites and
                are becoming the basis for a variety of tools that even
                influence both web designers and developers influence both web
                designers and developers.
              </p>
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-4">
                  <img
                    class="w-7 h-7 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                    alt="Bonnie Green avatar"
                  />
                  <span class="font-medium dark:text-white">Bonnie Green</span>
                </div>
                <a
                  href="#"
                  class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Read more
                  <svg
                    class="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div class="max-w-2xl mx-auto px-4">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion {blogs.length ? `(${blogs.length})` : "(0)"}
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" class="sr-only">
                Your comment
              </label>
              {username ? (
                <textarea
                  id="comment"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="6"
                  class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  required
                ></textarea>
              ) : (
                <p className="text-base text-gray-400">
                  You must be sign in to comment
                </p>
              )}
            </div>
            {username ? (
              <button
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-black bg-white"
              >
                Post comment
              </button>
            ) : null}
          </form>
          <div>
            {blogs.length < 0 && <p>No comments yet</p>}
            {blogs.length > 0 &&
              blogs.map((blog) => (
                <div className="mt-2 text-white border-b-[1px] border-solid border-slate-400 py-2">
                  <div className="flex items-center gap-5">
                    <span className="text-sm text-gray-400">
                      {blog.userName}
                    </span>
                    <span className="text-sm text-gray-400">
                      {blog.createdAt}
                    </span>
                  </div>
                  {isEditing === blog._id ? (
                    <div className="mt-2">
                      <textarea
                        class="p-3 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                      ></textarea>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={handleCancel}
                          className="px-2 py-1 text-sm text-red-500 rounded-md bg-red-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleEdit(blog._id)}
                          className="px-2 py-1 text-sm text-green-500 rounded-md bg-green-50"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="my-1 text-xl text-gray-300">{blog.content}</p>
                  )}
                  {blog.userId === userId && (
                    <div
                      className={`${
                        offContent
                          ? "hidden"
                          : "flex items-center gap-5 text-sm text-gray-400"
                      }`}
                    >
                      <span
                        onClick={() => handleEditClick(blog)}
                        className="cursor-pointer hover:text-blue-500"
                      >
                        Edit
                      </span>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="cursor-pointer hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
