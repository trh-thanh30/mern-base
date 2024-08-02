const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/user.models");
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide username, email and password" });
    }
    const extingUser = await Users.findOne({ email });
    if (extingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({
        message: "Login successfully",
        userId: user._id,
        userName: user.username,
        gmail: user.email,
      });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};
module.exports = { register, login };
