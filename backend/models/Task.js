const mongoose = require("mongoose");

module.exports = mongoose.model("Task", new mongoose.Schema({
  title: String,
  status: { type: String, default: "todo" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
}, { timestamps: true }));