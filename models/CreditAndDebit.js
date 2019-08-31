const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  items: {
    type: String,
    required: true
  },
  particular: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  credit: {
    type: String,
    required: true
  },
  debit: {
    type: String,
    required: true
  },
  others: {
    type: String,
    required: true
  }
});
