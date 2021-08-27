const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const ProjectType = new GraphQLObjectType({
	name: 'ProjectType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the project' },
		internalName: {
			type: GraphQLString,
			description: 'Project name visible to project owners and contributors',
		},
        // add rest of fields...
	}),
});

module.exports = ProjectType;
