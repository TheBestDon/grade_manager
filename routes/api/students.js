const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');

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
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

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

// @route   GET api/students/login
// @desc    Login Student / Ruturns JWT token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const student_number = req.body.student_number;
    const password = req.body.password;

    // Find student by student number
    const student = await Student.findOne({ student_number });

    // Check for student
    if (!student) {
      return res
        .status(404)
        .json({ student_number: 'Studentas tokiu numeriu nerastas' });
    }

    // Check password
    const correctPassword = await bcrypt.compare(password, student.password);

    if (correctPassword) {
      // Student matched

      const payload = {
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
        student_number: student.number,
        email: student.email
      };

      // Sign Token
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 36000 },
        (err, token) => {
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        }
      );
    } else {
      return res.status(400).json({ password: 'Neteisingas slaptažodis' });
    }
  } catch (error) {
    console.log(error);
  }
});

// @route   GET api/students/current
// @desc    Return current student
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      student_number: req.user.student_number
    });
  }
);

module.exports = router;
