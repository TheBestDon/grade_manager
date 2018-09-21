const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Student = mongoose.model('Student');
const Lecturer = mongoose.model('Lecturer');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Look for student
        const student = await Student.findById(jwt_payload.id);

        if (student) {
          // Student found
          return done(null, student);
        } else {
          // Look for lecturer
          const lecturer = await Lecturer.findById(jwt_payload.id);

          if (lecturer) {
            // Lecturer found
            return done(null, lecturer);
          } else {
            // No student or lecturer found
            return done(null, false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })
  );
};
