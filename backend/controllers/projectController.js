const Project = require("../models/Project");

// CREATE PROJECT

exports.createProject = async (req, res) => {

  try {

    const { name, members } = req.body;

    const project = await Project.create({
      name,
      members,
    });

    res.json(project);

  } catch (err) {

    res.status(500).json({
      msg: "Project creation failed",
    });

  }
};

// GET PROJECTS

exports.getProjects = async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("members", "name email role");

    res.json(projects);

  } catch (err) {

    res.status(500).json({
      msg: "Fetch failed",
    });

  }
};