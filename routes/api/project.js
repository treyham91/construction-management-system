const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys");

// Load Project validation middleware
const validateProjectInput = require("../../validation/projects");

// Load Models
const Project = require("../../models/Project");
//const Customer = require("../../models/customer");

// Test Project route
router.get("/test", (req, res) => res.json({ msg: "Project router works" }));

// @route   GET api/project/
// @desc    Gets all projects
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Create an error object to hold error messages
    const errors = {};

    Project.find().then(projects => {
      if (!projects) {
        errors.noprojects = "No projects found";
        return res.status(404).json(errors);
      } else {
        res.json(projects);
      }
    });
  }
);

// @route   POST api/project/create
// @desc    Creates a new project
// @access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    } else {
      // Look for existing projects with the same work order
      // We won't default to editing an existing project, we will
      // create another route to handle updating projects
      const workorder = req.body.workorder;
      Project.findOne({ workorder: workorder }).then(project => {
        if (project) {
          errors.exists = `A project with ${req.body.workorder} already exists`;
          return res.status(404).json(errors);
        } else {
          // project types object will handle multiple project types
          const projectTypes = {};
          if (req.body.roofing) projectTypes.roofing = req.body.roofing;
          if (req.body.siding) projectTypes.siding = req.body.siding;
          if (req.body.electrical)
            projectTypes.electrical = req.body.electrical;
          if (req.body.plumbing) projectTypes.plumbing = req.body.plumbing;
          if (req.body.hvac) projectTypes.hvac = req.body.hvac;
          if (req.body.general) projectTypes.general = req.body.general;
          if (req.body.other) projectTypes.other = req.body.other;

          const newProject = new Project({
            user: req.user.id,
            name: req.body.name,
            type: projectTypes,
            workorder: workorder,
            esimatedcost: req.body.estimatedcost,
            projectstartdate: req.body.projectstartdate,
            estimatedprojectenddate: req.body.estimatedprojectenddate
          });
          newProject
            .save()
            .then(project => res.json(project))
            .catch(err => res.status(404).json(err));
        }
      });
    }
  }
);

// @route   DELETE api/project/delete
// @desc    Delete a project
// @access  Private
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (res, req) => {
    const errors = {};

    Project.findOneAndRemove({ _id: req.project.id }).then(async () => {
      await res.json({ success: "Project successfully deleted" });
    });
  }
);

module.exports = router;
