const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: ""
  }
});

let mailOptions = {
  from: "biraj.halder1992@gmail.com",
  to: "birajhalder123@gmail.com",
  subject: "CCP DATABASE PROJECT",
  text: " It is testing parpuse"
};

transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    return console.log(" Error Occurs");
  } else {
    console.log("Email is sent successfully..");
    console.log(data);
  }
});
module.exports = router;
