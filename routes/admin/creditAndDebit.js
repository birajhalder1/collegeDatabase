const express = require('express');
const router = express.Router();

// Load model
const creditAndDebit = require('../../models/CreditAndDebit');

//@router GET admin/creditAndDebit/test
//@dsce Test route
//@access Private
router.get("/test", (req, res) => res.json("credit and Debit route is work"));

module.exports = router;