const Validator = require('validator');
const _ = require('lodash');

// Student input validation
module.exports = {
  validateStudentRegisterInput: data => {
    let errors = {};

    // Make string because validator validates only strings
    data.first_name = !_.isEmpty(_.trim(data.first_name))
      ? data.first_name
      : '';
    data.last_name = !_.isEmpty(_.trim(data.last_name)) ? data.last_name : '';
    data.email = !_.isEmpty(_.trim(data.email)) ? data.email : '';
    data.student_number = !_.isEmpty(_.trim(data.student_number))
      ? data.student_number
      : '';
    data.password = !_.isEmpty(_.trim(data.password)) ? data.password : '';
    data.password2 = !_.isEmpty(_.trim(data.password2)) ? data.password2 : '';

    if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
      errors.first_name = 'Vardas turi būti ne trumpesnis nei 2 raidės';
    }

    if (Validator.isEmpty(data.first_name)) {
      errors.first_name = 'Vardas yra privalomas';
    }
    if (Validator.isEmpty(data.last_name)) {
      errors.last_name = 'Pavardė yra privaloma';
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = 'El.pašto adresas yra privalomas';
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Neteisingas el.pašto adresas';
    }
    if (Validator.isLength(data.student_number, { min: 7, max: 7 })) {
      errors.student_number = 'Neteisingas studento numeris';
    }
    if (Validator.isEmpty(data.student_number)) {
      errors.student_number = 'Studento numeris yra privalomas';
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = 'Slaptažodis turi būti ne trumpesnis nei 6 simboliai';
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Slaptažodis yra privalomas';
    }
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = 'Pakartokite slaptažodį';
    }
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = 'Slaptažodžiai turi būti vienodi';
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  },
  validateLecturerRegisterInput: data => {
    let errors = {};

    // Make string because validator validates only strings
    data.first_name = !_.isEmpty(_.trim(data.first_name))
      ? data.first_name
      : '';
    data.last_name = !_.isEmpty(_.trim(data.last_name)) ? data.last_name : '';
    data.email = !_.isEmpty(_.trim(data.email)) ? data.email : '';
    data.university = !_.isEmpty(_.trim(data.university))
      ? data.university
      : '';
    data.faculty = !_.isEmpty(_.trim(data.faculty)) ? data.faculty : '';
    data.password = !_.isEmpty(_.trim(data.password)) ? data.password : '';
    data.password2 = !_.isEmpty(_.trim(data.password2)) ? data.password2 : '';

    if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
      errors.first_name = 'Vardas turi būti ne trumpesnis nei 2 raidės';
    }

    if (Validator.isEmpty(data.first_name)) {
      errors.first_name = 'Vardas yra privalomas';
    }
    if (Validator.isEmpty(data.last_name)) {
      errors.last_name = 'Pavardė yra privaloma';
    }
    if (Validator.isEmpty(data.email)) {
      errors.email = 'El.pašto adresas yra privalomas';
    }
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Neteisingas el.pašto adresas';
    }
    if (Validator.isEmpty(data.university)) {
      errors.university = 'Pasirinkite universitetą';
    }
    if (Validator.isEmpty(data.faculty)) {
      errors.faculty = 'Pasirinkite fakultetą';
    }
    if (Validator.isEmpty(data.password)) {
      errors.password = 'Slaptažodis yra privalomas';
    }
    if (Validator.isEmpty(data.password2)) {
      errors.password2 = 'Pakartokite slaptažodį';
    }
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = 'Slaptažodžiai turi būti vienodi';
    }

    return {
      errors,
      isValid: _.isEmpty(errors)
    };
  }
};
