const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  student_number: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    default: ['read']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', StudentSchema, 'students');
