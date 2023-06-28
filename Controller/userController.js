const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are Mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user is already registered");
  }

  //hashing
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  // console.log(user);
  res.json({ message: "Register the user" });
});

// access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All field are mandatory!");
  }

  const user = await User.findOne({ email });
  //comparing the password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "20m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
  res.json({ message: "login the user" });
});

// access private (only for register users)
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
