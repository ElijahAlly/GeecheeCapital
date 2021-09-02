const graphql = require('graphql');
const { GraphQLInputObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLNonNull } = graphql;

const phone_number_input = new GraphQLInputObjectType({
	name: 'phone_number_input',
	fields: () => ({
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

module.exports = phone_number_input;
