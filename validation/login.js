const Validator = require('validator');
const isEmail = Validator.isEmail;
const isEmpty = Validator.isEmpty;
const validText = require('./valid_text');

module.exports = function validateLoginInput(data) {
	let errors = {};

	data.email = validText(data.email) ? data.email : '';
	data.password = validText(data.password) ? data.password : '';

	if (!isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	if (isEmpty(data.email)) {
		errors.email = 'Email field is required';
	}

	if (isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}

	return {
		errors,
		isValid: Object.keys(errors).length === 0,
	};
};

