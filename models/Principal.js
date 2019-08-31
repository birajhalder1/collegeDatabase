// Load mongoDB
const mongoose = require('mongoose');

// Create a Schema or Collection
const Schema = mongoose.Schema;
const PrincipalSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
});
module.exports = Principal = mongoose.model('principal', PrincipalSchema);