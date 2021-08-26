const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const PhoneType = new GraphQLObjectType({
	name: 'PhoneType',
	fields: () => ({
		type: { type: GraphQLString },
	}),
});


module.exports = PhoneType;
