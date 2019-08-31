const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const staffSchema = new Schema({
  name: {
    type: String,
    
  },
  add: {
    type: String,
   
  },
  phone: {
    type: Number,
    
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Staff = mongoose.model('staff', staffSchema);