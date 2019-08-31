const express = require("express");
const router = express.Router();
const passport = require("passport");
//Load model
const etcSemFees = require("../../models/EtcFees");

// @route   GET api/etcSemFees/test
// @desc    Tests cst student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: " ETC Students Works" }));

// @route   POST api/etcSemFees/etcFees
// @desc    mStudentinfo route
// @access  Private
router.post(
  "/etcFees",
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
    const newStudent = new etcSemFees(student);
    newStudent.save().then(result => res.json("Student information are saved"));
  }
);

// @route   POST api/etcSemFees/name
// @desc    Search etcSemFees name
// @access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let name = req.params.name;
    etcSemFees.findOne({ name }).then(name => {
      if (name) {
        // Search name
        return res.status(404).json(name);
      } else {
        return res.status(400).json(" Name not found in the database !");
      }
    });
  }
);

// @route   POST api/etcSemFees
// @desc    Search etcSemFees name all
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    etcSemFees.find().then(name => res.json(name));
  }
);

// @route   POST api/etcSemFees/id
// @desc    Search etcSemFees id
// @access  Private
router.get(
  "/search/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    etcSemFees.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   POST api/etcSemFees/update
// @desc    Update etcSemFees info
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
    etcSemFees
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then(update => res.json(update));
  }
);

// @route   POST api/etcSemFees/delete/:id
// @desc    Delete etcSemFees info
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    etcSemFees
      .deleteOne({ _id: id })
      .then(del => res.json({ msg: " Delete successfully !" }));
  }
);

module.exports = router;
