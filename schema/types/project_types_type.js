const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const ProjectTypesType = new GraphQLObjectType({
	name: 'ProjectTypesType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the project type' },
		name: { type: GraphQLString, description: 'The name for the project type' },
	}),
});

module.exports = ProjectTypesType;
