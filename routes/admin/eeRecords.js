const express = require("express");
const router = express.Router();
const passport = require("passport");
//Load model
const eeRecords = require("../../models/Ee");

// @route   GET api/cstRecords/test
// @desc    Tests cst student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: " CST Students Works" }));

// @route   POST api/cstRecords/cstInfo
// @desc    mStudentinfo route
// @access  Private
router.post(
  "/eeInfo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const student = {
      name: req.body.name,
      fname: req.body.fname,
      add: req.body.add,
      phone: req.body.phone,
      registration: req.body.registration,
      roll: req.body.roll,
      dept: req.body.dept,
      semester: req.body.semester
    };
    const newStudent = new eeRecords(student);
    newStudent.save().then(result => res.json("Student information are saved"));
  }
);

// @route   POST api/eeRecords/name
// @desc    Search eeRecords name
// @access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let name = req.params.name;
    eeRecords.findOne({ name }).then(name => {
      if (name) {
        // Search name
        return res.status(404).json(name);
      } else {
        return res.status(400).json(" Name not found in the database !");
      }
    });
  }
);

// @route   POST api/eeRecords
// @desc    Search eeRecords name all
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    eeRecords.find().then(name => res.json(name));
  }
);

// @route   POST api/eeRecords/id
// @desc    Search eeRecords id
// @access  Private
router.get(
  "/search/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    eeRecords.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   POST api/eeRecords/update
// @desc    Update eeRecords info
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    const data = {
      name: req.body.name,
      fname: req.body.fname,
      add: req.body.add,
      phone: req.body.phone,
      registration: req.body.registration,
      roll: req.body.roll,
      dept: req.body.dept,
      semester: req.body.semester
    };
    eeRecords
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then(update => res.json(update));
  }
);

// @route   POST api/eeRecords/delete/:id
// @desc    Delete eeRecords info
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    eeRecords
      .deleteOne({ _id: id })
      .then(del => res.json({ msg: " Delete successfully !" }));
  }
);
module.exports = router;
