const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString } = graphql;
const UserErrorsType = require('./errors/user_errors')

const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		userErrors: {
			type: UserErrorsType,
		},
	}),
});


module.exports = UserType;
