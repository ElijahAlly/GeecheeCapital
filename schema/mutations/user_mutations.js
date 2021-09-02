const graphql = require('graphql');
const { GraphQLString, GraphQLNonNull, GraphQLID } = graphql;

const mongoose = require('mongoose');
const User = mongoose.model('User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');

// validations
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const UserMutations = {
	createUser: {
		type: require('../types/user_type'),
		args: {
			// required to create a user
			firstName: {
				type: new GraphQLNonNull(GraphQLString),
				description: 'The first name of the user',
			},
			lastName: {
				type: new GraphQLNonNull(GraphQLString),
				description: 'The last name of the user',
			},
			password: {
				type: new GraphQLNonNull(GraphQLString),
				description: "The user's password",
			},
			primaryEmail: {
				type: new GraphQLNonNull(GraphQLString),
				description: 'The primary email name for the user',
			},
			primaryPhoneNumber: {
				type: new GraphQLNonNull(require('../inputs/phone_number_input')),
				description: 'The primary phone of the user',
			},
			primaryAddress: {
				type: new GraphQLNonNull(require('../inputs/address_input')),
				description: 'The primary address of the user',
			},
			// not required to create a user
			bio: {
				type: GraphQLString,
				description: 'The bio of a user (200 chars limit)',
			},
			// profilePic: {
			// 	type: require('../types/file_type'),
			// 	description: 'The profile picture for a user',
			// },
		},
		async resolve(parentValue, args) {
			const error = validateRegisterInput(args);

			if (error) {
				return { error };
			}

			const { primaryEmail, password, primaryPhoneNumber } = args;

			try {
				const emailExists = await User.findOne({ primaryEmail });
				const phoneNumberExists = await User.findOne({ primaryPhoneNumber });

				if (emailExists) {
					return {
						error: 'A user has already registered with this email address',
					};
				} else if (phoneNumberExists) {
					return {
						error: 'A user has already registered with this phone number',
					};
				}

				const hashPassword = new Promise((res, reject) =>
					bcrypt.hash(password, 10, async (err, hash) => {
						if (err) throw err;

						try {
							const newUser = await new User({
								...args,
								password: hash,
							});

							await newUser.save();
							res(newUser);
							return;
						} catch (err) {
							res({
								error: `${err}`,
							});
							return;
						}
					})
				);

				const returnedUser = await hashPassword;
				return returnedUser;
			} catch (err) {
				return {
					error: `${err}`,
				};
			}
		},
	},
	updateUser: {
		type: require('../types/user_type'),
		args: {
			_id: { type: new GraphQLNonNull(GraphQLID) },
			firstName: {
				type: GraphQLString,
				description: 'The first name of the user',
			},
			lastName: {
				type: GraphQLString,
				description: 'The last name of the user',
			},
			password: {
				type: GraphQLString,
				description: "The user's password",
			},
			primaryEmail: {
				type: GraphQLString,
				description: 'The primary email name for the user',
			},
			primaryPhoneNumber: {
				type: require('../inputs/phone_number_input'),
				description: 'The primary phone of the user',
			},
			primaryAddress: {
				type: require('../inputs/address_input'),
				description: 'The primary address of the user',
			},
			bio: {
				type: GraphQLString,
				description: 'The bio of a user (200 chars limit)',
			},
		},
		async resolve(
			parentValue,
			{
				_id,
				firstName,
				lastName,
				password,
				primaryEmail,
				primaryPhoneNumber,
				primaryAddress,
				bio,
			}
		) {
			try {
				firstName = firstName ? { firstName } : {};
				lastName = lastName ? { lastName } : {};
				password = password ? { password } : {};
				primaryEmail = primaryEmail ? { primaryEmail } : {};
				primaryPhoneNumber = primaryPhoneNumber ? { primaryPhoneNumber } : {};
				primaryAddress = primaryAddress ? { primaryAddress } : {};
				bio = bio ? { bio } : {};

				const filter = { _id };
				const updateParams = {
					...firstName,
					...lastName,
					...password,
					...primaryEmail,
					...primaryPhoneNumber,
					...primaryAddress,
					...bio,
				};

				const updatedUser = await User.findOneAndUpdate(
					filter,
					updateParams,
					{ new: true } // return document after update was applied.
				);

				return updatedUser;
			} catch (error) {
				return { error };
			}
		},
	},
	// deleteUser: {
	// 	type: require('../types/user_type'),
	// 	args: { id: { type: new GraphQLNonNull(GraphQLID) } },
	// 	async resolve(parentValue, { id }) {
	// 		try {
	// 			const deletedUser = await User.findOneAndDelete(
	// 				{ _id: id },
	// 				{ maxTimeMS: 5 }
	// 			);

	// 			return deletedUser;
	// 		} catch (err) {
	// 			return { userErrors: err };
	// 		}
	// 	},
	// },
	login: {
		type: require('../types/user_type'),
		args: {
			email: { type: new GraphQLNonNull(GraphQLString) },
			password: { type: new GraphQLNonNull(GraphQLString) },
		},
		async resolve(parentValue, args) {
			const { email, password } = args;
			const { errors, isValid } = validateLoginInput(args);

			if (!isValid) return { userErrors: errors };

			try {
				const user = await User.findOne({ email });
				if (!user) {
					return {
						userErrors: {
							valid: 'No account found with this email',
						},
					};
				}

				const resUser = {};

				const comparePassword = new Promise((res, reject) =>
					bcrypt.compare(password, user.password, (err, isMatch) => {
						if (err) throw { err: 'could not compare' };

						if (isMatch) {
							const payload = { id: user._id, email: user.email };

							jwt.sign(
								payload,
								keys.secretOrKey,
								{ expiresIn: 3600 },
								(err, token) => {
									resUser.email = user.email;
									resUser.name = user.name;
									resUser.id = user._id;
									// res.json({
									//     success: true,
									//     token: 'Bearer ' + token,
									//     user,
									// });
								}
							);
							res('logged in user successfully');
						} else {
							return res('Incorrect password');
						}
					})
				);

				await comparePassword;
				return resUser;
			} catch (err) {
				console.log(err);
				return { userErrors: err };
			}
		},
	},
};

module.exports = UserMutations;
