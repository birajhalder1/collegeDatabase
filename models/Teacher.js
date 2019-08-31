const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TeacherSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  add: {
    type: String,
    require: true
  },
  dept: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Teacher = mongoose.model("teacher", TeacherSchema);
