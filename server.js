const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// dotenv configuration
require("dotenv").config();

// Load express framework
const app = express();

// Load accounts route
const accounts = require("./routes/admin/creditAndDebit");

// Load Admin Route
const principal = require("./routes/admin/principal");
const cteacher = require("./routes/admin/teacher");
const ostaff = require("./routes/admin/staff");

const cStudent = require("./routes/admin/cstRecords");
const cFees = require("./routes/admin/cstSemFees");
const cResult = require("./routes/admin/cstResult");

const eStudent = require("./routes/admin/eeRecords");
const eFees = require("./routes/admin/eeSemFees");
const eResult = require("./routes/admin/eeResult");

const mStudent = require("./routes/admin/meRecords");
const mFees = require("./routes/admin/meSemFees");
const mResult = require("./routes/admin/meResult");

const etStudent = require("./routes/admin/etcRecords");
const etFees = require("./routes/admin/etcSemFees");
const etResult = require("./routes/admin/etcResult");

// Middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Confic DB
const db = require("./config/keys").mongoURI;

//Middleware mongoDB connect
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport configaretion
require("./config/passport")(passport);

// Middleware admin route
app.use("/admin/principal", principal);
app.use("/admin/teacher", cteacher);
app.use("/admin/staff", ostaff);

app.use("/admin/cstRecords", cStudent);
app.use("/admin/cstSemFees", cFees);
app.use("/admin/cstResult", cResult);

app.use("/admin/eeRecords", eStudent);
app.use("/admin/eeSemFees", eFees);
app.use("/admin/eeResult", eResult);

app.use("/admin/meRecords", mStudent);
app.use("/admin/meSemFees", mFees);
app.use("/admin/meResult", mResult);

app.use("/admin/etcRecords", etStudent);
app.use("/admin/etcSemFees", etFees);
app.use("/admin/etcResult", etResult);

// Server loading
const port = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("Hello world"));
app.listen(port, console.log(`Server is running port no ${port}`));
