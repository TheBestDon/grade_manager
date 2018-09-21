const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

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
    const lecturer = await Lecturer.findOne({
      email: req.body.email
    });

    if (lecturer) {
      return res.status(400).json({
        email: 'Toks el.pašto adresas jau yra užregistruotas'
      });
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

module.exports = router;
