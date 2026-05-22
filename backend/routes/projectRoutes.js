const router = require("express").Router();

const auth = require("../middleware/auth");
const role = require("../middleware/role");

const Project = require("../models/Project");

const {
  createProject,
  getProjects
} = require("../controllers/projectController");

// CREATE PROJECT
router.post(
  "/",
  auth,
  role("admin"),
  createProject
);

// GET PROJECTS
router.get(
  "/",
  auth,
  getProjects
);

// DELETE PROJECT
router.delete(
  "/:id",
  auth,
  role("admin"),
  async (req, res) => {

    try {

      await Project.findByIdAndDelete(req.params.id);

      res.json({
        msg: "Project deleted"
      });

    } catch (err) {

      res.status(500).json({
        msg: "Delete failed"
      });

    }
  }
);

module.exports = router;