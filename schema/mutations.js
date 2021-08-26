const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const UserMutations = require('./mutations/user_mutations');
const { createUser, deleteUser, updateUser, login } = UserMutations;

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		// users
		createUser,
		deleteUser,
		updateUser,
		login,

		// projects

		// comments
	},
});

module.exports = mutation;
