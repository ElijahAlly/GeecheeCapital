const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull } = graphql;

const mongoose = require('mongoose');
const ProjectComment = mongoose.model('ProjectComment');
const User = mongoose.model('User');
const Project = mongoose.model('Project');

const ProjectCommentType = new GraphQLObjectType({
	name: 'ProjectCommentType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the project comment' },
		project: {
            type: require('./project_type'),
            description: 'The project that the comment was posted on',
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			async resolve(parentValue, { id }) {
				try {
					return await Project.findById(id);
				} catch (err) {
					console.log(err);
				}
			},
        },
		author: {
            type: require('./user_type'),
            description: 'The author of the comment',
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			async resolve(parentValue, { id }) {
				try {
					return await User.findById(id);
				} catch (err) {
					console.log(err);
				}
			},
        },
		body: { type: GraphQLString, description: 'The body of the comment' },
		replies: { 
			type: new GraphQLList(require('./user_type')),
			description: 'List of replies for a comment',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await ProjectComment.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			}
		},
		likes: {
			type: new GraphQLList(require('./user_type')),
			description: 'Comment likes',
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
			description: 'Comment dislikes',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await User.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		lastUpdatedOn: {
			type: GraphQLString,
			description: 'Date comment was last updated'
		},
		createdOn: {
			type: GraphQLString,
			description: 'Date comment was created'
		}
	}),
});

module.exports = ProjectCommentType;
