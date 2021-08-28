const graphql = require('graphql');
const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLNonNull } = graphql;

const mongoose = require('mongoose');
const User = mongoose.model('User');

const ProjectFaqType = new GraphQLObjectType({
	name: 'ProjectFaqType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the project type' },
		question: {
            type: GraphQLString,
            description: 'Question for the FAQ'
        },
		answer: {
            type: GraphQLString,
            description: 'Answer to the FAQ'
        },
		author: {
            type: GraphQLID,
            description: 'The user who created this FAQ',
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			async resolve(parentValue, { id }) {
				try {
					return await User.findById(id);
				} catch (err) {
					console.log(err);
				}
			},
        },
		pulished: {
            type: GraphQLBoolean,
            description: 'Is FAQ published?'
        },
		order: {
            type: GraphQLInt,
            description: '...not sure'
        },
        lastUpdatedOn: {
			type: GraphQLString,
			description: 'Date FAQ was last updated'
		},
		createdOn: {
			type: GraphQLString,
			description: 'Date FAQ was created'
		}
	}),
});

module.exports = ProjectFaqType;
