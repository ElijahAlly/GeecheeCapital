const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString, GraphQLBoolean } = graphql;

const AddressInput = new GraphQLInputObjectType({
	name: 'AddressInput',
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

module.exports = AddressInput;
