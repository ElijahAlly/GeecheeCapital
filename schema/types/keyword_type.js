const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const KeywordType = new GraphQLObjectType({
	name: 'KeywordType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the keyword' },
		name: {
			type: GraphQLString,
			description: 'keyword name',
		},
	}),
});

module.exports = KeywordType;
