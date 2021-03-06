const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLID } =
	graphql;

const AddressType = new GraphQLObjectType({
	name: 'AddressType',
	fields: () => ({
		street: { type: GraphQLString },
		streetLine2: { type: GraphQLString },
		city: { type: GraphQLString },
		county: { type: GraphQLString },
		state: { type: GraphQLString },
		country: { type: GraphQLString },
		zip: { type: GraphQLString },
		primary: { type: GraphQLBoolean },
		addressType: { type: GraphQLString },
	}),
});

module.exports = AddressType;
