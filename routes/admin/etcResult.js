const express = require("express");
const router = express.Router();
const passport = require("passport");
//Load model
const etcResult = require("../../models/EtcResult");

// @route   GET api/etcResult/test
// @desc    Tests etc student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: " ETC Students Works" }));

// @route   POST api/etcResult/etcResult
// @desc    mStudentinfo route
// @access  Private
router.post(
  "/etcResults",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const student = {
      name: req.body.name,
      dept: req.body.dept,
      roll: req.body.roll,
      semester: req.body.semester,
      marks: req.body.marks
    };
    const newStudent = new etcResult(student);
    newStudent.save().then(result => res.json("Student information are saved"));
  }
);

// @route   POST api/etcResult/name
// @desc    Search etcResult name
// @access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let name = req.params.name;
    etcResult.findOne({ name }).then(name => {
      if (name) {
        // Search name
        return res.status(404).json(name);
      } else {
        return res.status(400).json(" Name not found in the database !");
      }
    });
  }
);

// @route   POST api/etcResult
// @desc    Search etcResult name all
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    etcResult.find().then(name => res.json(name));
  }
);

// @route   POST api/etcResult/id
// @desc    Search etcResult id
// @access  Private
router.get(
  "/search/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    etcResult.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   POST api/etcResult/update
// @desc    Update etcResult info
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
    etcResult
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then(update => res.json(update));
  }
);

// @route   POST api/etcResult/delete/:id
// @desc    Delete etcResult info
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    etcResult
      .deleteOne({ _id: id })
      .then(del => res.json({ msg: " Delete successfully !" }));
  }
);

module.exports = router;
