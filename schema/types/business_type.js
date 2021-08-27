const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLList,
	GraphQLID,
} = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Address = mongoose.model('Address');

const BusinessType = new GraphQLObjectType({
	name: 'BusinessType',
	fields: () => ({
		id: { type: GraphQLID, description: 'The id of the address' },
		owners: {
			type: new GraphQLList(require('./user_type')),
			description: 'Businesses followed',
            args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await User.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
        name: {
            type: GraphQLString,
            description: 'Name of business'
        },
        primaryAddress: {
			type: require('./address_type'),
			description: 'The primary address of the user',
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			async resolve(parentValue, { id }) {
				try {
					return await Address.findById(id);
				} catch (err) {
					console.log(err);
				}
			},
		},
        addresses: {
			type: new GraphQLList(require('./address_type')),
			description: 'The address list of the user',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await Address.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
	}),
});

module.exports = BusinessType;
