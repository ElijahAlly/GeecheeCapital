const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLBoolean, GraphQLNonNull } = graphql;

const FileType = new GraphQLObjectType({
	name: 'FileType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the file' },
		author: { 
            type: require('./user_type'), 
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			async resolve(parentValue, {id}) {
				const user = await User.findById(id);
                return user;
			}
        },
        name: { type: GraphQLString },
        path: { type: GraphQLString },
        type: { type: GraphQLString },
        size: { type: GraphQLInt },
        serverName: { type: GraphQLString },
        serverId: { type: GraphQLString },
        description: { type: GraphQLString },
        order: { type: GraphQLInt },
        active: { type: GraphQLBoolean },
        lastUpdatedOn: { type: GraphQLString },
        createdOn: { type: GraphQLString },
	}),
});

module.exports = FileType;
