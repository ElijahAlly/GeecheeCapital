const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
	GraphQLNonNull
} = graphql;

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Keyword = mongoose.model('Keyword');
const File = mongoose.model('File');
const ProjectFaq = mongoose.model('ProjectFaq');

const ProjectType = new GraphQLObjectType({
	name: 'ProjectType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the project' },
		internalName: {
			type: GraphQLString,
			description: 'Project name visible to project owners and contributors',
		},
		publicName: {
			type: GraphQLString,
			description: 'Project name visible to everyone',
		},
		fundingGoal: {
			type: GraphQLInt,
			description: 'Funding goal for project',
		},
		minFundingToLaunch: {
			type: GraphQLInt,
			description: 'Minimum funding for project to launch',
		},
		fundingDueDate: {
			type: GraphQLString,
			description: 'Date funding ends for project',
		},
		allOrNothing: {
			type: GraphQLBoolean,
			description: '...not sure',
		},
		story: {
			type: GraphQLString,
			description: 'Project story',
		},
		tagline: {
			type: GraphQLString,
			description: 'Project tagline',
		},
		valuation: {
			type: GraphQLInt,
			description: 'Project valuation',
		},
		purchasePrice: {
			type: GraphQLInt,
			description: 'Project purchase price',
		},
		rehabCost: {
			type: GraphQLInt,
			description: 'Project rehab cost',
		},
		owners: {
			type: new GraphQLList(require('./user_type')),
			description: 'Project owners',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await User.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		contributors: {
			type: new GraphQLList(require('./user_type')),
			description: 'Project contributors',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await User.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		primaryAddress: {
			type: require('./address_type'),
			description: 'The primary address of the project',
		},
		addresses: {
			type: new GraphQLList(require('./address_type')),
			description: 'The address list of the project',
		},
		keywords: {
			type: new GraphQLList(require('./keyword_type')),
			description: 'Keywords for the project',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await Keyword.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		likes: {
			type: new GraphQLList(require('./user_type')),
			description: 'Project likes',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await User.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		dislikes: {
			type: new GraphQLList(require('./user_type')),
			description: 'Project dislikes',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await User.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		comments: {
			type: new GraphQLList(require('./project_comment_type')),
			description: 'Project comments',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await User.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		files: {
			type: new GraphQLList(require('./file_type')),
			description: 'The list of files for a project',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await File.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		featuredImage: {
			type: require('./file_type'),
			description: 'The featured image of a project',
		},
		featuredVideo: {
			type: require('./file_type'),
			description: 'The featured video of a project',
		},
		projectTypes: {
			type: new GraphQLList(require('./project_types_type')),
			description: 'The list of types for a project',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await ProjectType.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		risks: {
			type: new GraphQLList(GraphQLString),
			description: 'The list of risks for a project',
		},
		milestones: {
			type: new GraphQLList(
				new GraphQLObjectType({
					name: 'Keyword',
					fields: () => ({
						description: {
							type: GraphQLString,
							decription: 'Description for the milestone',
						},
						createdOn: {
							type: GraphQLString,
							description: 'Date milestone was created on',
						},
					}),
				})
			),
			description: 'The list of milestones for a project',
		},
		faqs: {
			type: new GraphQLList(require('./project_faq_type')),
			description: "The list of FAQ's for a project",
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await ProjectFaq.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		createdOn: {
			type: GraphQLString,
			description: 'Date project was created'
		}
	}),
});

module.exports = ProjectType;
