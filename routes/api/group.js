const express = require('express');
const router = express.Router();

// @route   GET api/group/test
// @desc    Tests group route
// @access  Public
router.get('/test', (req, res) => {
  res.json({ msg: 'Groups Work' });
});

module.exports = router;
