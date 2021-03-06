const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLNonNull } = graphql;

const PhoneNumberType = new GraphQLObjectType({
	name: 'PhoneNumberType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the phone number' },
		number: {
			type: GraphQLString,
			description: 'The phone number of the user',
		},
		phoneType: {
			type: GraphQLString,
			description: 'The phone type of the user',
		},
		primary: {
			type: GraphQLBoolean,
			description: 'Is the primary phone of the user',
		},
	}),
});

module.exports = PhoneNumberType;
