const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
} = graphql;

const mongoose = require('mongoose');
const User = mongoose.model('User');
const File = mongoose.model('File');
const Project = mongoose.model('Project');
const ProjectComment = mongoose.model('ProjectComment');
const Tradeline = mongoose.model('Tradeline');
const Business = mongoose.model('Business');

const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: () => ({
		_id: { type: GraphQLID, description: 'The id of the user' },
		firstName: {
			type: GraphQLString,
			description: 'The first name of the user',
		},
		lastName: { type: GraphQLString, description: 'The last name of the user' },
		password: { type: GraphQLString, description: 'The password of the user' },
		primaryPhoneNumber: {
			type: require('./phone_number_type'),
			description: 'The primary phone of the user',
		},
		phoneNumbers: {
			type: new GraphQLList(require('./phone_number_type')),
			description: 'The phone list of the user',
		},
		primaryEmail: {
			type: GraphQLString,
			description: 'The primary email of the user',
		},
		emails: {
			type: new GraphQLList(GraphQLString),
			description: 'The email list of the user',
		},
		primaryAddress: {
			type: require('./address_type'),
			description: 'The primary address of the user',
		},
		addresses: {
			type: new GraphQLList(require('./address_type')),
			description: 'The address list of the user',
		},
		files: {
			type: new GraphQLList(require('./file_type')),
			description: 'The list of files for a user',
			args: { _id: { type: GraphQLID } },
			async resolve(parentValue, { _id }) {
				try {
					const user = await User.findById(_id);
					return await File.find({ _id: { $in: user.files } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		profilePic: {
			type: require('./file_type'),
			description: 'The profile picture for a user',
		},
		bio: {
			type: GraphQLString,
			description: 'The bio of a user (200 chars limit)',
		},
		followers: {
			type: new GraphQLList(require('./user_type')),
			description: 'List of followers for a user',
			args: { _id: { type: GraphQLID } },
			async resolve(parentValue, { _id }) {
				try {
					const user = await User.findById(_id);
					return await User.find({ _id: { $in: user.followers } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		following: {
			type: new GraphQLList(require('./user_type')),
			description: 'List of followers for a user',
			args: { _id: { type: GraphQLID } },
			async resolve(parentValue, { _id }) {
				try {
					const user = await User.findById(_id);
					return await User.find({ _id: { $in: user.following } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		projects: {
			type: new GraphQLList(require('./project_type')),
			description: "List of user's created projects",
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await Project.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		likedProjects: {
			type: new GraphQLList(require('./project_type')),
			description: "List of user's liked projects",
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await Project.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		projectsComments: {
			type: new GraphQLList(require('./project_comment_type')),
			description: "List of user's created comments under projects",
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await ProjectComment.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		likedProjectsComments: {
			type: new GraphQLList(require('./project_comment_type')),
			description: "List of user's liked comments under projects",
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await ProjectComment.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		projectsInvestedIn: {
			type: new GraphQLList(require('./project_type')),
			description: 'List of projects invested in by user',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await Project.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		followedProjects: {
			type: new GraphQLList(require('./project_type')),
			description: 'List of projects followed by the user',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await Project.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		projectMemberships: {
			type: new GraphQLList(require('./project_type')),
			description: 'List of project memberships for user',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await Project.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		businessesFollowed: {
			type: new GraphQLList(require('./business_type')),
			description: "List of user's followed businesses",
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await Business.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		tradelines: {
			type: new GraphQLList(require('./tradeline_type')),
			description: 'List of tradelines bought by user',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await Tradeline.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		createdOn: {
			type: GraphQLString,
			description: 'Date user account was created',
		},
		error: {
			type: GraphQLString,
			description: 'User errors'
		}
	}),
});

module.exports = UserType;
