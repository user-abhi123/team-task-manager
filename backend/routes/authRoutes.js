const router = require("express").Router();

const User = require("../models/User");

const {
  signup,
  login,
} = require("../controllers/authController");

const auth = require("../middleware/auth");


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

    console.log(err);

    res.status(500).json({
      msg: "Server Error",
    });

  }

});


module.exports = router;