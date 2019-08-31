const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mechanicalFeesSchema = new Schema({
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
module.exports = Me = mongoose.model('mechanicalFees', mechanicalFeesSchema);