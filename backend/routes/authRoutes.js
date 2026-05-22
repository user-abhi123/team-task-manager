const router = require("express").Router();

const {
  signup,
  login,
} = require("../controllers/authController");

const auth = require("../middleware/auth");

const User = require("../models/User");

// REGISTER
router.post("/signup", signup);

// LOGIN
router.post("/login", login);

// GET ALL USERS
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);

  } catch (err) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});

module.exports = router;