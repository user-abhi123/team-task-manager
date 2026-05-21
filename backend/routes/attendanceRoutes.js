const express = require("express");
const router = express.Router();
const {
  punchIn,
  punchOut,
  getToday,
} = require("../controllers/attendanceController");
const auth = require("../middleware/auth");

router.post("/punch-in", auth, punchIn);
router.post("/punch-out", auth, punchOut);

// ✅ NEW ROUTE
router.get("/today", auth, getToday);

module.exports = router;