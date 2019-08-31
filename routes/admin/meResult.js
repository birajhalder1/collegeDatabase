const express = require("express");
const router = express.Router();
const passport = require("passport");
//Load model
const meResult = require("../../models/MeResult");

// @route   GET api/meResult/test
// @desc    Tests me student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: " ME Students Works" }));

// @route   POST api/meResult/meResult
// @desc    mStudentinfo route
// @access  Private
router.post(
  "/meResults",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const student = {
      name: req.body.name,
      dept: req.body.dept,
      roll: req.body.roll,
      semester: req.body.semester,
      marks: req.body.marks
    };
    const newStudent = new meResult(student);
    newStudent.save().then(result => res.json("Student information are saved"));
  }
);

// @route   POST api/meResult/name
// @desc    Search meResult name
// @access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let name = req.params.name;
    meResult.findOne({ name }).then(name => {
      if (name) {
        // Search name
        return res.status(404).json(name);
      } else {
        return res.status(400).json(" Name not found in the database !");
      }
    });
  }
);

// @route   POST api/meResult
// @desc    Search meResult name all
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    meResult.find().then(name => res.json(name));
  }
);

// @route   POST api/meResult/id
// @desc    Search meResult id
// @access  Private
router.get(
  "/search/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    meResult.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   POST api/meResult/update
// @desc    Update meResult info
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    const data = {
      name: req.body.name,
      dept: req.body.dept,
      roll: req.body.roll,
      semester: req.body.semester,
      marks: req.body.marks
    };
    meResult
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then(update => res.json(update));
  }
);

// @route   POST api/meResult/delete/:id
// @desc    Delete meResult info
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    meResult
      .deleteOne({ _id: id })
      .then(del => res.json({ msg: " Delete successfully !" }));
  }
);

module.exports = router;
