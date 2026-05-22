const router = require("express").Router();

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const {
  signup,
  login,
} = require("../controllers/authController");


// REGISTER
router.post("/signup", signup);


// LOGIN
router.post("/login", login);


// GET USERS
router.get("/users", async (req, res) => {

  try {

    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        msg: "No token",
      });
    }

    const actualToken = token.split(" ")[1];

    jwt.verify(
      actualToken,
      process.env.JWT_SECRET
    );

    const users = await User.find().select("-password");

    res.json(users);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server error",
    });

  }

});

module.exports = router;