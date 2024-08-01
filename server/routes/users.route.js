const express = require("express");
const { register, login } = require("../controller/users.controller");

const router = express.Router();

router.post("/api/register", register);
router.post("/api/login", login);
module.exports = router;
