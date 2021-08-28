const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLNonNull,
} = graphql;

const mongoose = require('mongoose');
const User = mongoose.model('User');
const Transaction = mongoose.model('Transaction');

const TradelineType = new GraphQLObjectType({
	name: 'TradelineType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the tradeline' },
		seller: {
            type: require('./user_type'),
            description: 'The seller of the tradeline',
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			async resolve(parentValue, { id }) {
				try {
					return await User.findById(id);
				} catch (err) {
					console.log(err);
				}
			},
        },
		creditCardCompany: {
			type: GraphQLString,
			description: 'Company credit card belongs too'
		},
		dateOpened: {
			type: GraphQLString,
			description: 'Date tradeline was opened'
		},
		reportingDate: {
			type: GraphQLString,
			description: '...not sure'
		},
		creditLimit: {
			type: GraphQLInt,
			description: '...not sure'
		},
		transactions: {
			type: require('./transaction_type'),
            description: 'The transaction for the tradeline',
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			async resolve(parentValue, { id }) {
				try {
					return await Transaction.findById(id);
				} catch (err) {
					console.log(err);
				}
			},
		}
	}),
});

module.exports = TradelineType;
