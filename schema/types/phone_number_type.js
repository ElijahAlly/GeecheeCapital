const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;
const PhoneType = require('./phone_type')

const PhoneNumberType = new GraphQLObjectType({
	name: 'PhoneNumberType',
	fields: () => ({
		number: { type: GraphQLString },
		phoneType: { type: PhoneType },
		primary: { type: GraphQLBoolean },
	}),
});


module.exports = PhoneNumberType;
