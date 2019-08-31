const express = require("express");
const router = express.Router();
const passport = require("passport");
//Load model
const etcRecords = require("../../models/Etc");

// @route   GET api/etcRecords/test
// @desc    Tests etc student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: " ETC Students Works" }));

// @route   POST api/etcRecords/etcInfo
// @desc    etcRecords route
// @access  Private
router.post(
  "/etcInfo",
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
    const newStudent = new etcRecords(student);
    newStudent.save().then(result => res.json("Student information are saved"));
  }
);

// @route   POST api/etcRecords/name
// @desc    Search etcRecords name
// @access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let name = req.params.name;
    etcRecords.findOne({ name }).then(name => {
      if (name) {
        // Search name
        return res.status(404).json(name);
      } else {
        return res.status(400).json(" Name not found in the database !");
      }
    });
  }
);

// @route   POST api/etcRecords
// @desc    Search etcRecords name all
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    etcRecords.find().then(name => res.json(name));
  }
);

// @route   POST api/etcRecords/id
// @desc    Search etcRecords id
// @access  Private
router.get(
  "/search/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    etcRecords.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   POST api/etcRecords/update
// @desc    Update etcRecords info
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
    etcRecords
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then(update => res.json(update));
  }
);

// @route   POST api/etcRecords/delete/:id
// @desc    Delete etcRecords info
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    etcRecords
      .deleteOne({ _id: id })
      .then(del => res.json({ msg: " Delete successfully !" }));
  }
);

module.exports = router;
