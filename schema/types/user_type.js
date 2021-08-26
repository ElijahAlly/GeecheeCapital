const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString } = graphql;
const UserErrorsType = require('./errors/user_errors');
const PhoneNumberType = require('./phone_number_type');

const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: () => ({
		id: { type: GraphQLID },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		password: { type: GraphQLString },
		password: { type: GraphQLString },
		password: { type: GraphQLString },
		primaryPhoneNumber: { type: PhoneNumberType },
		phoneNumbers: { type: new GraphQLList(PhoneNumberType) },
		userErrors: { type: UserErrorsType },
	}),
});

module.exports = UserType;
