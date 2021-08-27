const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const ProjectCommentType = new GraphQLObjectType({
	name: 'ProjectCommentType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the project comment' },
        // add rest of fields...
	}),
});


module.exports = ProjectCommentType;
