const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateEducationInput(data) {
	let errors = {};

	data.school = !isEmpty(data.school) ? data.school : '';
	data.degree = !isEmpty(data.degree) ? data.degree : '';
	data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
	data.from = !isEmpty(data.from) ? data.from : '';

	const schoolEmptyValidationMessage = 'School field is required.';
	const degreeEmptyValidationMessage = 'Degree field is required.';
	const fieldOfStudyEmptyValidationMessage = 'Field of study field is required.';
	const fromEmptyValidationMessage = 'From field is required.';

	if (Validator.isEmpty(data.school)) {
		errors.school = schoolEmptyValidationMessage;
	}

	if (Validator.isEmpty(data.degree)) {
		errors.degree = degreeEmptyValidationMessage;
	}

	if (Validator.isEmpty(data.fieldOfStudy)) {
		errors.fieldOfStudy = fieldOfStudyEmptyValidationMessage;
	}

	if (Validator.isEmpty(data.from)) {
		errors.from = fromEmptyValidationMessage;
	}

	return {
		errors,
		isValid: isEmpty(errors),
	}
};



