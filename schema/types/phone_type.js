const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const PhoneType = new GraphQLObjectType({
	name: 'PhoneType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the phone type' },
		type: { type: GraphQLString, description: 'Type of phone' },
	}),
});


module.exports = PhoneType;
