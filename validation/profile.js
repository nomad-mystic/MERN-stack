const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
	let errors = {};

	data.handle = !isEmpty(data.handle) ? data.handle : '';
	data.status = !isEmpty(data.status) ? data.status : '';
	data.skills = !isEmpty(data.skills) ? data.skills : '';
	data.website = !isEmpty(data.website) ? data.website : '';
	data.youtube = !isEmpty(data.youtube) ? data.youtube : '';
	data.twitter = !isEmpty(data.twitter) ? data.twitter : '';
	data.facebook = !isEmpty(data.facebook) ? data.facebook : '';
	data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : '';
	data.instagram = !isEmpty(data.instagram) ? data.instagram : '';

	const handleLengthValidationMessage = 'Profile must be at between 2 characters long and max of 30';
	const statusEmptyValidationMessage = 'Status field is required.';
	const skillsEmptyValidationMessage = 'Skills field is required.';
	const websiteIsNotValidationMessage = 'URL is not a valid website.';
	const notAValidURLValidationMessage = 'Not a valid URL';

	if (!Validator.isLength(data.handle, {min: 2, max: 40})) {
		errors.handle = handleLengthValidationMessage;
	}

	if (Validator.isEmpty(data.status)) {
		errors.status = statusEmptyValidationMessage;
	}

	if (Validator.isEmpty(data.skills)) {
		errors.skills = skillsEmptyValidationMessage;
	}

	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = websiteIsNotValidationMessage;
		}
	}

	if (!isEmpty(data.youtube)) {
		if (!Validator.isURL(data.youtube)) {
			errors.youtube = notAValidURLValidationMessage;
		}
	}

	if (!isEmpty(data.twitter)) {
		if (!Validator.isURL(data.twitter)) {
			errors.twitter = notAValidURLValidationMessage;
		}
	}

	if (!isEmpty(data.facebook)) {
		if (!Validator.isURL(data.facebook)) {
			errors.facebook = notAValidURLValidationMessage;
		}
	}

	if (!isEmpty(data.linkedin)) {
		if (!Validator.isURL(data.linkedin)) {
			errors.linkedin = notAValidURLValidationMessage;
		}
	}

	if (!isEmpty(data.instagram)) {
		if (!Validator.isURL(data.instagram)) {
			errors.instagram = notAValidURLValidationMessage;
		}
	}

	return {
		errors,
		isValid: isEmpty(errors),
	}
};
