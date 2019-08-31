const express = require("express");
const router = express.Router();
const passport = require("passport");
//Load model
const staff = require("../../models/Staff");

// @route   GET admin/staff/test
// @desc    Tests cst student route
// @access  Private
router.get("/test", (req, res) => res.json({ msg: " Staff page Works" }));

// @route   POST admin/staff/staffInfo
// @desc    mStudentinfo route
// @access  Private
router.post(
  "/staffInfo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const data = {
      name: req.body.name,
      add: req.body.add,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password
    };
    const newdata = new staff(data);
    newdata.save().then(result => res.json("Student information are saved"));
  }
);

// @route   POST admin/staff/name
// @desc    Search staff name
// @access  Private
router.get(
  "/:name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let name = req.params.name;
    staff.findOne({ name }).then(name => {
      if (name) {
        // Search name
        return res.status(404).json(name);
      } else {
        return res.status(400).json(" Name not found in the database !");
      }
    });
  }
);

// @route   POST admin/staff
// @desc    Search staff name all
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    staff.find().then(name => res.json(name));
  }
);

// @route   POST admin/staff/id
// @desc    Search staff id
// @access  Private
router.get(
  "/search/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    staff.findOne({ _id: id }).then(result => res.json(result));
  }
);

// @route   POST admin/staff/update
// @desc    Update staff info
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    const data = {
      name: req.body.name,
      add: req.body.add,
      phone: req.body.phone,
      email: req.body.email
    };
    staff
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then(update => res.json(update));
  }
);

// @route   POST admin/staff/delete/:id
// @desc    Delete staff info
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    staff
      .deleteOne({ _id: id })
      .then(del => res.json({ msg: " Delete successfully !" }));
  }
);

module.exports = router;
