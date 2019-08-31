const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const computerSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  fname:{
    type: String,
    required: true
  },
  add:{
    type: String,
    required: true
  },
  phone:{
    type: Number,
    required: true
  },
  registration:{
    type: String,
    required: true
  },
  roll:{
    type: String,
    required: true
  },
  dept:{
    type: String,
    required: true
  },
  semester:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
});
module.exports = Cst = mongoose.model('cst', computerSchema);