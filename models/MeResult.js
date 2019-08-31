const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const mechanicalResultSchema = new Schema({
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
module.exports = MeResult = mongoose.model(
  "mechanicalResult",
  mechanicalResultSchema
);
