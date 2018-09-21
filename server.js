const express = require('express');
const mongoose = require('mongoose');

const students = require('./routes/api/students');
const lectors = require('./routes/api/lectors');
const profile = require('./routes/api/profile');
const group = require('./routes/api/group');

const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Mongo Connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api/students', students);
app.use('/api/lectors', lectors);
app.use('/api/profile', profile);
app.use('/api/group', group);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
