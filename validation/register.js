const Validator = require('validator');
const _ = require('lodash');

module.exports = function validateRegistreInput(data) {
  let errors = {};

  if ((!Validator.isLength(data.first_name), { min: 2, max: 30 })) {
    errors.first_name = 'Vardas turi būti ne trumpesnis nei 2 raidės';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
