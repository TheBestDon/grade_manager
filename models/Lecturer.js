const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LecturerSchema = new Schema({
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
  university: {
    type: String,
    required: true
  },
  faculty: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    default: ['create', 'edit']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lecturer', LecturerSchema, 'lecturers');
