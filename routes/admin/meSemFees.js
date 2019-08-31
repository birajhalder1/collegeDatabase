const express = require("express");
const router = express.Router();
const passport = require("passport");
//Load model
const meSemFees = require("../../models/MeFees");

// @route   GET api/meSemFees/test
// @desc    Tests me student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: " ME Students Works" }));

// @route   POST api/meSemFees/meFees
// @desc    mStudentinfo route
// @access  Private
router.post(
  "/meFees",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const student = {
      name: req.body.name,
      dept: req.body.dept,
      phone: req.body.phone,
      roll: req.body.roll,
      semester: req.body.semester,
      fees: req.body.fees
    };
    const newStudent = new meSemFees(student);
    newStudent.save().then(result => res.json("Student information are saved"));
  }
);

// @route   POST api/meSemFees/name
// @desc    Search meSemFees name
// @access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let name = req.params.name;
    meSemFees.findOne({ name }).then(name => {
      if (name) {
        // Search name
        return res.status(404).json(name);
      } else {
        return res.status(400).json(" Name not found in the database !");
      }
    });
  }
);

// @route   POST api/meSemFees
// @desc    Search meSemFees name all
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    meSemFees.find().then(name => res.json(name));
  }
);

// @route   POST api/meSemFees/id
// @desc    Search meSemFees id
// @access  Private
router.get(
  "/search/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    meSemFees.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   POST api/meSemFees/update
// @desc    Update meSemFees info
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    const data = {
      name: req.body.name,
      dept: req.body.dept,
      phone: req.body.phone,
      roll: req.body.roll,
      semester: req.body.semester,
      fees: req.body.fees
    };
    meSemFees
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then(update => res.json(update));
  }
);

// @route   POST api/meSemFees/delete/:id
// @desc    Delete meSemFees info
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    meSemFees
      .deleteOne({ _id: id })
      .then(del => res.json({ msg: " Delete successfully !" }));
  }
);

module.exports = router;
