const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const port = process.env.PORT || 3001;
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((er) => console.log(err));

app.use(express.json());
app.use("/user", require("./routes/users.route.js"));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
