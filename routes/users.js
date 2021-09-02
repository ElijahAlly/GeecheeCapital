const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js');
const passport = require('passport');

// models
const User = require('../models/User');

// validations
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

router.get(
	'/current',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.json({
			id: req.user.id,
			email: req.user.email,
		});
	}
);

// get user by id needs...
// in body: nothing
// in params: users id
router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		res.json(user);
	} catch (err) {
		console.log(err);
	}
});

// create user needs...
// in body: email, password
// in params: nothing
router.post('/signup', async (req, res) => {
	console.log('request body::: ',req.body);
	const { errors, isValid } = validateRegisterInput(req.body);
	if (!isValid) return res.status(400).json(errors);
	const { primaryEmail, password, primaryPhoneNumber } = req.body;

	try {
		const emailExists = await User.findOne({ primaryEmail });
		const phoneNumberExists = await User.findOne({ primaryPhoneNumber });

		if (!!emailExists || !!phoneNumberExists) {
			return res.status(400).json({
				email: 'A user has already registered with this email address',
			});
		} else {
			bcrypt.hash(password, 10, (err, hash) => {
				if (err) throw err;
				const newUser = new User({
					...req.body,
					primaryEmail,
					password: hash,
				});

				newUser
					.save()
					.then(() => res.json(newUser))
					.catch((err) => console.log(err));
			});
		}
	} catch (err) {
		console.log(err);
	}
});

// query needs...
// in body: email, password
// in params: nothing
router.post('/login', async (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) return res.status(400).json(errors);

	const email = req.body.email;
	const password = req.body.password;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({
				user: 'This user does not exist',
				email: 'No account found with this email',
			});
		}

		bcrypt.compare(password, user.password, (err, isMatch) => {
			if (err) throw { err: 'could not compare' };

			if (isMatch) {
				const payload = { id: user.id, email: user.email };

				jwt.sign(
					payload,
					keys.secretOrKey,
					// Tell the key to expire in one hour
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token,
							user,
						});
					}
				);
			} else {
				console.log('is a match: ', isMatch);
				return res.status(400).json({ password: 'Incorrect password' });
			}
		});
	} catch (err) {
		console.log(err);
		return res.json({ err });
	}
});

// update user needs...
// in body: email
// in params: user id
router.patch('/:id', async (req, res) => {
	try {
		let newPassword = {};
		if (req.body.password) {
			console.log('in password', true);
			newPassword = { password: req.body.password };
		}

		const data = await User.findOneAndUpdate(
			{ _id: req.params.id },
			{ email: req.body.email, ...newPassword }
		);

		const updatedUser = await User.findById(data._id);

		const user = { email: updatedUser.email, id: updatedUser._id };
		res.json(user);
	} catch (err) {
		console.log(err);
	}
});

// delete user needs...
// in body: nothing
// in params: user id
router.delete('/:id', async (req, res) => {
	try {
		await User.findOneAndDelete({ _id: req.params.id }, { maxTimeMS: 5 });

		res.json('successfully deleted account');
	} catch (e) {
		print(e);
	}
});

module.exports = router;
