const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
	let errors = {};

	data.text = !isEmpty(data.text) ? data.text : '';

	const textLengthValidationMessage = 'Text must be between 10 and 300 characters';
	const textEmptyValidationMessage = 'Text field is required.';

	if (!Validator.isLength(data.text, {min: 10, max: 300})) {
		errors.text = textLengthValidationMessage;
	}

	if (Validator.isEmpty(data.text)) {
		errors.text = textEmptyValidationMessage;
	}

	return {
		errors,
		isValid: isEmpty(errors),
	}
};
