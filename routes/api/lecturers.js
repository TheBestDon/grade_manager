const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateLecturerRegisterInput = require('../../validation/register');
const { validateLecturerLoginInput } = require('../../validation/login');

// Load lecturer model
const Lecturer = require('../../models/Lecturer');

// @route   GET api/lecturers/test
// @desc    Tests lecturers route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Lectors Work' });
});

// @route   GET api/lecturers/register
// @desc    Register lecturer
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { errors, isValid } = validateLecturerRegisterInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const lecturer = await Lecturer.findOne({
      email: req.body.email
    });

    if (lecturer) {
      errors.email = 'Toks el.pašto adresas jau yra užregistruotas';
      return res.status(400).json(errors);
    } else {
      const newLecturer = new Lecturer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        university: req.body.university,
        faculty: req.body.faculty,
        password: req.body.password
      });

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newLecturer.password, salt);

      newLecturer.password = hash;
      const savedLecturer = await newLecturer.save();

      res.json(savedLecturer);
    }
  } catch (error) {
    console.log(error);
  }
});

// @route   GET api/lecturers/login
// @desc    Login Lecturer / Ruturns JWT token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { errors, isValid } = validateLecturerLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find lecturer by email
    const lecturer = await Lecturer.findOne({ email });

    // Check for student
    if (!lecturer) {
      errors.email = 'Vartotojas su tokiu el.pašto adresu nerastas';
      return res.status(404).json(errors);
    }

    // Check password
    const correctPassword = await bcrypt.compare(password, lecturer.password);

    if (correctPassword) {
      // Lecturer matched

      const payload = {
        id: lecturer.id,
        first_name: lecturer.first_name,
        last_name: lecturer.last_name,
        email: lecturer.email,
        university: lecturer.university,
        faculty: lecturer.faculty
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
      errors.password = 'Neteisingas slaptažodis';
      return res.status(400).json(errors);
    }
  } catch (error) {
    console.log(error);
  }
});

// @route   GET api/lecturers/current
// @desc    Return current lecturer
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
      university: req.user.university,
      faculty: req.user.faculty
    });
  }
);

module.exports = router;
