const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLID } =
	graphql;

const AddressType = new GraphQLObjectType({
	name: 'AddressType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the address' },
		street: { type: GraphQLString },
		streetLine2: { type: GraphQLString },
		city: { type: GraphQLString },
		county: { type: GraphQLString },
		state: { type: GraphQLString },
		country: { type: GraphQLString },
		zip: { type: GraphQLInt },
		primary: { type: GraphQLBoolean },
		addressType: { type: GraphQLString },
	}),
});

module.exports = AddressType;
