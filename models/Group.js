const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GroupSchema = new Schema({
  lecturer: {
    type: Schema.Types.ObjectId,
    ref: 'Lecturer'
  },
  additional_lecturer: {
    type: [Schema.Types.ObjectId],
    ref: 'Lecturer'
  },
  name: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  semester: {
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
  student_year: {
    type: String,
    required: true
  },
  students: {
    type: [Schema.Types.ObjectId],
    ref: 'Student'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Group', GroupSchema, 'groups');
