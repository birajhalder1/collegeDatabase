const express = require("express");
const router = express.Router();
const passport = require("passport");
//Load model
const teacher = require("../../models/Teacher");

// @route   GET api/teacher/test
// @desc    Tests cst student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: " Teacher Works" }));

// @route   POST api/teacher/teacherInfo
// @desc    Teacher route
// @access  Private
router.post(
  "/teacherInfo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const data = {
      name: req.body.name,
      add: req.body.add,
      dept: req.body.dept,
      phone: req.body.phone,
      email: req.body.email
    };
    const newdata = new teacher(data);
    newdata.save().then(result => res.json("Teacher information are saved"));
  }
);

// @route   POST api/teacher/name
// @desc    Search teacher name
// @access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let name = req.params.name;
    teacher.findOne({ name }).then(name => {
      if (name) {
        // Search name
        return res.status(404).json(name);
      } else {
        return res.status(400).json(" Name not found in the database !");
      }
    });
  }
);

// @route   POST api/teacher
// @desc    Search teacher name all
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    teacher.find().then(name => res.json(name));
  }
);

// @route   POST api/teacher/id
// @desc    Search teacher id
// @access  Private
router.get(
  "/search/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    teacher.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   POST api/teacher/update
// @desc    Update teacher info
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    const data = {
      name: req.body.name,
      add: req.body.add,
      dept: req.body.dept,
      phone: req.body.phone,
      email: req.body.email
    };
    teacher
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then(update => res.json(update));
  }
);

// @route   POST api/teacher/delete/:id
// @desc    Delete teacher info
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    teacher
      .deleteOne({ _id: id })
      .then(del => res.json({ msg: " Delete successfully !" }));
  }
);

module.exports = router;
