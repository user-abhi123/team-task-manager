const Attendance = require("../models/Attendance");

// Punch In
exports.punchIn = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  let record = await Attendance.findOne({
    user: req.user.id,
    date: today,
  });

  if (record) return res.status(400).json({ msg: "Already punched in" });

  record = await Attendance.create({
    user: req.user.id,
    date: today,
    punchIn: new Date(),
  });

  res.json(record);
};

// Punch Out
exports.punchOut = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const record = await Attendance.findOne({
    user: req.user.id,
    date: today,
  });

  if (!record) return res.status(400).json({ msg: "Punch in first" });

  if (record.punchOut)
    return res.status(400).json({ msg: "Already punched out" });

  record.punchOut = new Date();

  const diff = (record.punchOut - record.punchIn) / 1000; // seconds
  record.totalTime = Math.floor(diff);

  await record.save();

  res.json(record);
};

// ✅ NEW: Get today attendance
exports.getToday = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const record = await Attendance.findOne({
    user: req.user.id,
    date: today,
  });

  res.json(record);
};