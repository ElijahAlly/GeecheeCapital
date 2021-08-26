const Validator = require('validator');
const isLength = Validator.isLength;
const isEmail = Validator.isEmail;
const isEmpty = Validator.isEmpty;
const validText = require('./valid_text');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	let name = validText(data.name) ? data.name : '';
	let email = validText(data.email) ? data.email : '';
	let password = validText(data.password) ? data.password : '';

	if (!isLength(name, { min: 2, max: 30 })) {
		errors.name = 'name must be between 2 and 30 characters';
	}

	if (isEmpty(name)) {
		errors.name = 'name field is required';
	}

	if (isEmpty(email)) {
		errors.email = 'Email field is required';
	}

	if (!email.includes('@') || !email.includes('.')) {
		errors.email = 'Check yo email fool';
	}

	if (!isEmail(email, {domain_specific_validation: true})) {
		errors.email = 'Email is invalid';
	}

	if (isEmpty(password)) {
		errors.password = 'Password field is required';
	}

	if (!isLength(password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0,
	};
};

