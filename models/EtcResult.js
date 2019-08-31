const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const electronicsResultSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dept: {
    type: String,
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
  marks: {
    type: Number,
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = EtcResult = mongoose.model("electronicsResult", electronicsResultSchema);
