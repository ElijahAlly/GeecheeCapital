const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLNonNull,
} = graphql;

const TradelineType = new GraphQLObjectType({
	name: 'TradelineType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the tradeline' },
		// add rest of fields...
	}),
});

module.exports = TradelineType;
