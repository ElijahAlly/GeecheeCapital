const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLInt, GraphQLID } =
	graphql;

const mongoose = require('mongoose');
const User = mongoose.model('User');

const TransactionType = new GraphQLObjectType({
	name: 'TransactionType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the transaction' },
		buyer: { 
            type: require('./user_type'),
            description: 'The buyer of this transaction',
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			async resolve(parentValue, { id }) {
				try {
					return await User.findById(id);
				} catch (err) {
					console.log(err);
				}
			},
        },
        chargedAmount: {
            type: GraphQLInt,
            description: 'Amount charged for transaction'
        },
        currency: {
            type: GraphQLString,
            description: 'Currency used for transaction'
        },
        status: {
            type: GraphQLString,
            description: 'Status of transaction'
        },
        refundPending: {
            type: GraphQLBoolean,
            description: 'Is refund pending?'
        },
        purchaseDate: {
            type: GraphQLString,
            description: 'Date transaction took place',
        },
        purchaseTimeStamp: {
            type: GraphQLString,
            description: 'Date transaction took place',
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            async resolve(parentValue, { id }) {
				try {
					const transaction = await Transaction.findById(id);
                    return transaction.createdAt;
				} catch (err) {
					console.log(err);
				}
			},
        }
	}),
});

module.exports = TransactionType;
