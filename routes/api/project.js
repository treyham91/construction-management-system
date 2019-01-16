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
const Customer = require("../../models/customer");

// Test Project route
router.get("/", (req, res) => res.json({ msg: "Project router works" }));

// @route   GET api/project/
// @desc    Gets all projects
// @access  Public
router.get("/", (req, res) => {
  // Create an error object to hold error messages
  const errors = {};

  Project.find(projects => {
    if (!projects) {
      errors.noprojects = "No projects found";
      return res.status(404).json(errors);
    } else {
      res.json({
        name: req.projects.name,
        customer: req.projects.customer,
        projectstartdate: req.projects.projectstartdate,
        estimatedprojectenddate: req.projects.estimatedprojectenddate
      });
    }
  });
});

// @route   POST api/project/create
// @desc    Creates a new project
// @access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.data);

    if (!isValid) {
      return res.status(404).json(errors);
    } else {
      // Look for existing projects with the same work order
      // We won't default to editing an existing project, we will
      // create another route to handle updating projects
      Project.findOne({ workorder: req.body.workorder }).then(project => {
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
            name: req.body.name,
            type: projectTypes,
            workorder: req.bodyworkorder,
            esimatedcost: req.body.estimatedcost,
            projectstartdate: req.body.projectstartdate,
            estimatedprojectenddate: req.body.estimatedprojectenddate
          });

          // Just for security purposes, we will hash the workorder
          // numbers so customer information linked to this number
          // will be better protected
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newProject.workorder, salt, (err, hash) => {
              if (err) throw err;
              newProject.workorder = hash;
              newProject
                .save()
                .then(project => res.json(project))
                .catch(err => res.status(404).json(err));
            });
          });
        }
      });
    }
  }
);

module.exports = router;
