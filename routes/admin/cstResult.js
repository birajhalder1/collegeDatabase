const express = require("express");
const router = express.Router();
const passport = require("passport");
//Load model
const cstResult = require("../../models/CstResult");

// @route   GET api/cstResult/test
// @desc    Tests cst student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: " CST Students Works" }));

// @route   POST api/cstResult/cstResult
// @desc    mStudentinfo route
// @access  Private
router.post(
  "/cstResults",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const student = {
      name: req.body.name,
      dept: req.body.dept,
      roll: req.body.roll,
      semester: req.body.semester,
      marks: req.body.marks
    };
    const newStudent = new cstResult(student);
    newStudent.save().then(result => res.json("Student information are saved"));
  }
);

// @route   POST api/cstResult/name
// @desc    Search cstResult name
// @access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let name = req.params.name;
    cstResult.findOne({ name }).then(name => {
      if (name) {
        // Search name
        return res.status(404).json(name);
      } else {
        return res.status(400).json(" Name not found in the database !");
      }
    });
  }
);

// @route   POST api/cstResult
// @desc    Search cstResult name all
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    cstResult.find().then(name => res.json(name));
  }
);

// @route   POST api/cstResult/search/:id
// @desc    Search cstResult id
// @access  Private
router.get(
  "/search/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    cstResult.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   POST api/cstResult/update
// @desc    Update cstResult info
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
    cstResult
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then(update => res.json(update));
  }
);

// @route   POST api/cstResult/delete/:id
// @desc    Delete cstResult info
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    cstResult
      .deleteOne({ _id: id })
      .then(del => res.json({ msg: " Delete successfully !" }));
  }
);

module.exports = router;
