const express = require("express");
const router = express.Router();
const passport = require("passport");
//Load model
const eeResult = require("../../models/EeResult");

// @route   GET api/eeResult/test
// @desc    Tests ee student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: " EE Students Works" }));

// @route   POST api/eeResult/eeResult
// @desc    mStudentinfo route
// @access  Private
router.post(
  "/eeResults",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const student = {
      name: req.body.name,
      dept: req.body.dept,
      roll: req.body.roll,
      semester: req.body.semester,
      marks: req.body.marks
    };
    const newStudent = new eeResult(student);
    newStudent.save().then(result => res.json("Student information are saved"));
  }
);

// @route   POST api/eeResult/name
// @desc    Search eeResult name
// @access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let name = req.params.name;
    eeResult.findOne({ name }).then(name => {
      if (name) {
        // Search name
        return res.status(404).json(name);
      } else {
        return res.status(400).json(" Name not found in the database !");
      }
    });
  }
);

// @route   POST api/eeResult
// @desc    Search eeResult name all
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    eeResult.find().then(name => res.json(name));
  }
);

// @route   POST api/eeResult/id
// @desc    Search eeResult id
// @access  Private
router.get(
  "/search/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    eeResult.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   POST api/eeResult/update
// @desc    Update eeResult info
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
    eeResult
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then(update => res.json(update));
  }
);

// @route   POST api/eeResult/delete/:id
// @desc    Delete eeResult info
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    eeResult
      .deleteOne({ _id: id })
      .then(del => res.json({ msg: " Delete successfully !" }));
  }
);

module.exports = router;
