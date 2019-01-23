const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateExperienceInput(data) {
	let errors = {};

	data.title = !isEmpty(data.title) ? data.title : '';
	data.company = !isEmpty(data.company) ? data.company : '';
	data.from = !isEmpty(data.from) ? data.from : '';

	const titleEmptyValidationMessage = 'Title field is required.';
	const companyEmptyValidationMessage = 'Company field is required.';
	const fromEmptyValidationMessage = 'From field is required.';

	if (Validator.isEmpty(data.title)) {
		errors.title = titleEmptyValidationMessage;
	}

	if (Validator.isEmpty(data.company)) {
		errors.company = companyEmptyValidationMessage;
	}

	if (Validator.isEmpty(data.from)) {
		errors.from = fromEmptyValidationMessage;
	}

	return {
		errors,
		isValid: isEmpty(errors),
	}
};



