const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

dotenv.config();
const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(cookieParser());
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/user", require("./routes/users.route.js"));
app.use("/blog", require("./routes/blog.route.js"));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
