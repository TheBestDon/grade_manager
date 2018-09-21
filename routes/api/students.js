const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load student model
const Student = require('../../models/Student');

// @route   GET api/students/test
// @desc    Tests students route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Students Works' }));

// @route   GET api/students/register
// @desc    Register student
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const student = await Student.findOne({
      student_number: req.body.student_number
    });

    if (student) {
      return res.status(400).json({
        student_number: 'Toks studento numeris jau yra užregistruotas'
      });
    } else {
      const newStudent = new Student({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        student_number: req.body.student_number,
        password: req.body.password
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newStudent.password, salt);

      newStudent.password = hash;
      const savedStudent = await newStudent.save();

      res.json(savedStudent);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
