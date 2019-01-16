const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.email = !isEmpty(data.email) ? data.email : '';
	data.password = !isEmpty(data.password) ? data.password : '';
	data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';

	const nameLengthValidation = Validator.isLength(data.name, {min: 2, max: 30});
	const nameLengthValidationMessage = 'Name must be between 2 and 30 characters.';
	const nameEmptyValidationMessage = 'Name field is required.';
	const emailEmptyValidationMessage = 'Email field is required.';
	const passwordEmptyValidationMessage = 'Password field is required.';
	const passwordLengthValidationMessage = 'Password must be at least 6 characters long and max of 30';
	const passwordConfirmEmptyValidationMessage = 'Password Confirm field is required.';
	const passwordMatchValidationMessage = 'Passwords must match';

	if (!nameLengthValidation) {
		errors.name = nameLengthValidationMessage;
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = nameEmptyValidationMessage;
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = emailEmptyValidationMessage;
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = passwordEmptyValidationMessage;
	}

	if (!Validator.isLength(data.password, {min: 6, max: 30})) {
		errors.password = passwordLengthValidationMessage;
	}

	if (Validator.isEmpty(data.passwordConfirm)) {
		errors.passwordConfirm = passwordConfirmEmptyValidationMessage;
	}

	if (!Validator.equals(data.password, data.passwordConfirm)) {
		errors.passwordConfirm = passwordMatchValidationMessage;
	}

	return {
		errors,
		isValid: isEmpty(errors),
	}
};
