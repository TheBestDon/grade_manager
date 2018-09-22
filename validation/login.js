const Validator = require('validator');
const _ = require('lodash');

// Student login validation
module.exports = {
  validateStudentLoginInput: data => {
    let errors = {};

    // Make string because validator validates only strings
    data.student_number = !_.isEmpty(_.trim(data.student_number))
      ? data.student_number
      : '';
    data.password = !_.isEmpty(_.trim(data.password)) ? data.password : '';

    if (Validator.isEmpty(data.student_number)) {
      errors.student_number = 'Studento numeris yra privalomas';
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Slaptažodis yra privalomas';
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  },
  validateLecturerLoginInput: data => {
    let errors = {};

    // Make string because validator validates only strings

    data.email = !_.isEmpty(_.trim(data.email)) ? data.email : '';
    data.password = !_.isEmpty(_.trim(data.password)) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
      errors.email = 'Neteisingas el.pašto adresas';
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = 'El.pašto adresas yra privalomas';
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Slaptažodis yra privalomas';
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  }
};
