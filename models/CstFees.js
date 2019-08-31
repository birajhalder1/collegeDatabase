const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const cstFeesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dept: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  roll: {
    type: String,
    required: true
  },

  semester: {
    type: String,
    required: true
  },
  fees: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = CstFees = mongoose.model("cstFees", cstFeesSchema);
