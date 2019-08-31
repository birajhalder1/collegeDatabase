const express = require("express");
const router = express.Router();
const passport = require("passport");
//Load model
const eeSemFees = require("../../models/EeFees");

// @route   GET api/cstRecords/test
// @desc    Tests cst student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: " CST Students Works" }));

// @route   POST api/cstRecords/cstInfo
// @desc    mStudentinfo route
// @access  Private
router.post(
  "/eeFees",
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
    const newStudent = new eeSemFees(student);
    newStudent.save().then(result => res.json("Student information are saved"));
  }
);

// @route   POST api/eeSemFees/name
// @desc    Search eeSemFees name
// @access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let name = req.params.name;
    eeSemFees.findOne({ name }).then(name => {
      if (name) {
        // Search name
        return res.status(404).json(name);
      } else {
        return res.status(400).json(" Name not found in the database !");
      }
    });
  }
);

// @route   POST api/eeSemFees
// @desc    Search eeSemFees name all
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    eeSemFees.find().then(name => res.json(name));
  }
);

// @route   POST api/eeSemFees/id
// @desc    Search eeSemFees id
// @access  Private
router.get(
  "/search/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    eeSemFees.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   POST api/eeSemFees/update
// @desc    Update eeSemFees info
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
    eeSemFees
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then(update => res.json(update));
  }
);

// @route   POST api/eeSemFees/delete/:id
// @desc    Delete eeSemFees info
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    eeSemFees
      .deleteOne({ _id: id })
      .then(del => res.json({ msg: " Delete successfully !" }));
  }
);

module.exports = router;
