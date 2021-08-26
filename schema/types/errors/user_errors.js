const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const UserErrorsType = new GraphQLObjectType({
    name: 'UserErrorsType',
    fields: () => ({
        email: { type: GraphQLString },
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        valid: { type: GraphQLString },
    })
})

module.exports = UserErrorsType;