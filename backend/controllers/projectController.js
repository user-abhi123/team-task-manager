const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find().populate("members");
  res.json(projects);
};