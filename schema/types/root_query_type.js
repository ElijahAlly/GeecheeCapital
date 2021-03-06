const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql;

const mongoose = require('mongoose');
const User = mongoose.model('User');
const UserType = require('./user_type');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		users: {
			type: new GraphQLList(UserType),
			async resolve() {
				const users = await User.find();
				return users;
			},
		},
		user: {
			type: UserType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, args) {
				return User.findById(args.id);
			},
		},
	}),
});

module.exports = RootQuery;
