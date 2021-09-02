const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const UserMutations = require('./mutations/user_mutations');
const { createUser, updateUser, login } = UserMutations;

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		// users
		createUser,
		updateUser,
		// deleteUser,
		login,

		// // projects
		// createProject,
		// updateProject,
		// deleteProject,

		// // comments
		// createComment,
		// updateComment,
		// deleteComment,

		// // business
		// createBusiness,
		// updateBusiness,
		// deleteBusiness,
	}),
});

module.exports = mutation;
