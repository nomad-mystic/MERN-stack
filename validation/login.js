const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
	let errors = {};

	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';

	const emailEmptyValidationMessage = 'Email field is required.';
	const emailInvalidValidationMessage = 'Email is Invalid';
	const passwordEmptyValidationMessage = 'Password field is required.';

	if (!Validator.isEmail(data.email)) {
		errors.email = emailInvalidValidationMessage;
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = emailEmptyValidationMessage;
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = passwordEmptyValidationMessage;
	}

	return {
		errors,
		isValid: isEmpty(errors),
	}
};



