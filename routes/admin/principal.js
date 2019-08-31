const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load Principal model
const Principal = require("../../models/Principal");

// Load configaretion keys file
const keys = require("../../config/keys");

//@router GET admin/principal/test
//@dsce Test route
//@access Private
router.get("/test", (req, res) => res.json("Principal route is work"));

//@router POST admin/principal/register
//@dsce Register route for admin registration
//@access Private
router.post("/register", (req, res) => {
  Principal.findOne({ email: req.body.email }).then(admin => {
    // Check admin already exits or not
    if (admin) {
      return res
        .status(400)
        .json(" Admin already exits !! Sorry you can new registration");
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Defaul
      });

      // New registraion
      const newAdmin = new Principal({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      // Genarate hasing password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(admin => res.json(admin))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@router POST admin/principal/login
//@dsce Login route for admin login
//@access Private
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Principal.findOne({ email }).then(admin => {
    // Check email found or not
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }
    //Chech password
    bcrypt.compare(password, admin.password).then(isMatch => {
      // Password match
      if (isMatch) {
        // Create JWT payload
        const payload = {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          password: admin.password,
          avatar: admin.avatar
        };

        // Create sign
        jwt.sign(
          payload,
          keys.secretOrkey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              payload
            });
          }
        );
      } else {
        return res.status(400).json(" Password incurrect ");
      }
    });
  });
});

// @route   POST api/principal/update
// @desc    Update principal info
// @access  Private
router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    Principal
      .findByIdAndUpdate({ _id: id }, { $set: data }, { new: true })
      .then(update => res.json(update));
  }
);

// @route   POST api/principal/delete/:id
// @desc    Delete principal info
// @access  Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    principal
      .deleteOne({ _id: id })
      .then(del => res.json({ msg: " Delete successfully !" }));
  }
);

//@router GET admin/principal/current
//@dsce Current route for current admin here
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log(req.user);
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

//@router GET admin/principal/online
//@dsce How many staff are online
//@access Private
router.post(
  "/online",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const email = req.body.email;
    Principal.find({ email }).then(user => {
      if (user === jwt.sign(keys.secretOrkey)) {
        res.json({
          id: req.user.id,
          username: req.user.username,
          email: req.user.email
        });
      }
    });
  }
);

module.exports = router;
