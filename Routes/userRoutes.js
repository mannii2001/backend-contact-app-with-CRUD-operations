const express = require("express");
const { registerUser, loginUser, currentUser } = require("../Controller/userController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser)

router.get("/currentUser",validateToken, currentUser)

module.exports = router;