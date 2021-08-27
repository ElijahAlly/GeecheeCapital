const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLNonNull } = graphql;

const mongoose = require('mongoose');
const PhoneType = mongoose.model('PhoneType');

const PhoneNumberType = new GraphQLObjectType({
	name: 'PhoneNumberType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the phone number' },
		number: {
			type: GraphQLString,
			description: 'The phone number of the user',
		},
		phoneType: {
			type: require('./phone_type'),
			description: 'The phone type of the user',
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			async resolve(parentValue, {id}) {
				const phoneType = await PhoneType.findById(id);
				return phoneType;
			},
		},
		primary: {
			type: GraphQLBoolean,
			description: 'Is the primary phone of the user',
		},
	}),
});

module.exports = PhoneNumberType;
