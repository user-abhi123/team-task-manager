const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  date: { type: String }, // e.g. 2026-05-04

  punchIn: { type: Date },
  punchOut: { type: Date },

  totalTime: { type: Number, default: 0 } // in minutes
});

module.exports = mongoose.model("Attendance", attendanceSchema);