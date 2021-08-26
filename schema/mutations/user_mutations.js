const graphql = require('graphql');
const { GraphQLString, GraphQLNonNull, GraphQLID } = graphql;

const mongoose = require('mongoose');
const User = mongoose.model('User');

const UserType = require('../types/user_type');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');
const passport = require('passport');

// validations
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const UserMutations = {
	createUser: {
		type: UserType,
		args: {
			name: { type: new GraphQLNonNull(GraphQLString) },
			email: { type: new GraphQLNonNull(GraphQLString) },
			password: { type: new GraphQLNonNull(GraphQLString) },
		},
		async resolve(parentValue, args) {
			const { errors, isValid } = validateRegisterInput(args);

			if (!isValid) return { userErrors: errors };
			const { email, password, name } = args;

			try {
				const user = await User.findOne({ email });

				if (user) {
					console.log('user already exists');
					return {
						userErrors: {
							valid: 'A user has already registered with this email address',
						},
					};
				} else {
					const resUser = {};
					const hashPassword = new Promise((res, reject) =>
						bcrypt.hash(password, 10, async (err, hash) => {
							if (err) throw err;
							const newUser = await new User({
								name,
								email,
								password: hash,
							});

							resUser.id = newUser._id;
							resUser.name = newUser.name;
							resUser.email = newUser.email;

							try {
								newUser.save();
								res('user created');
							} catch (err) {
								console.log(err);
								res(err);
							}
						})
					);

					await hashPassword;
					return resUser;
				}
			} catch (err) {
				console.log(err);
			}
		},
	},
	updateUser: {
		type: UserType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) },
			name: { type: GraphQLString },
			email: { type: GraphQLString },
			password: { type: GraphQLString },
		},
		async resolve(parentValue, { id, name, email, password }) {
			const newPassword = {};
			const newEmail = {};
			const newName = {};

			try {
				if (password) newPassword.password = password;
				if (name) newName.name = name;
				if (email) newEmail.email = email;

				const updatedUser = await User.findOneAndUpdate(
					{ _id: id },
					{ ...newName, ...newEmail, ...newPassword },
					{ new: true }
				);

				return updatedUser;
			} catch (err) {
				console.log(err);
				return { userErrors: err };
			}
		},
	},
	deleteUser: {
		type: UserType,
		args: { id: { type: new GraphQLNonNull(GraphQLID) } },
		async resolve(parentValue, { id }) {
			try {
				const deletedUser = await User.findOneAndDelete(
					{ _id: id },
					{ maxTimeMS: 5 }
				);

				return deletedUser;
			} catch (err) {
				return { userErrors: err };
			}
		},
	},
	login: {
		type: UserType,
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
                            res('logged in user successfully')
                        } else {
                            return res('Incorrect password');
                        }
                    })
                );

				await comparePassword;
				return resUser;
			} catch (err) {
				console.log(err);
				return{ userErrors: err };
			}
		},
	},
};

module.exports = UserMutations;
