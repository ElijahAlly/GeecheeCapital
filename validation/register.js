const Validator = require('validator');
const isLength = Validator.isLength;
const isEmail = Validator.isEmail;
const isEmpty = Validator.isEmpty;
const validText = require('./valid_text');

module.exports = function validateRegisterInput(data) {

	let firstName = validText(data.firstName) ? data.firstName : '';
	let lastName = validText(data.lastName) ? data.lastName : '';
	let email = validText(data.primaryEmail) ? data.primaryEmail : '';
	let password = validText(data.password) ? data.password : '';

	if (!isLength(firstName, { min: 2, max: 30 })) {
		return 'First name must be between 2 and 30 characters';
	}

	if (isEmpty(firstName)) {
		return 'First name field is required';
	}

	if (!isLength(lastName, { min: 2, max: 30 })) {
		return 'Last name must be between 2 and 30 characters';
	}

	if (isEmpty(lastName)) {
		return 'Last name field is required';
	}

	if (isEmpty(email)) {
		return 'Email field is required';
	}

	if (!isEmail(email, { domain_specific_validation: true })) {
		return 'Email is invalid';
	}

	if (isEmpty(password)) {
		return 'Password field is required';
	}

	if (!isLength(password, { min: 6, max: 30 })) {
		return 'Password must be at least 6 characters';
	}

	return null;
};
