const Project = require("../models/Project");

// ================= CREATE PROJECT =================

exports.createProject = async (req, res) => {

  try {

    const { name } = req.body;

    if (!name) {

      return res.status(400).json({
        msg: "Project name required",
      });

    }

    // duplicate project check

    const existing = await Project.findOne({ name });

    if (existing) {

      return res.status(400).json({
        msg: "Project already exists",
      });

    }

    const project = await Project.create({
      name,
    });

    res.json(project);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server Error",
    });

  }

};

// ================= GET PROJECTS =================

exports.getProjects = async (req, res) => {

  try {

    const projects = await Project.find();

    res.json(projects);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server Error",
    });

  }

};

// ================= DELETE PROJECT =================

exports.deleteProject = async (req, res) => {

  try {

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      msg: "Project deleted",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      msg: "Server Error",
    });

  }

};