const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLNonNull,
	GraphQLList,
	GraphQLID,
} = graphql;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Address = mongoose.model('Address');
const Keyword = mongoose.model('Keyword');

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
			description: 'Name of business',
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
		primaryPhoneNumber: {
			type: require('./phone_number_type'),
			description: 'The primary phone of the user',
		},
		phoneNumbers: {
			type: new GraphQLList(require('./phone_number_type')),
			description: 'The phone list of the user',
		},
		businessType: {
			type: GraphQLString,
			description: 'Type of business',
		},
		description: {
			type: GraphQLString,
			description: 'Business description',
		},
		keywords: {
			type: new GraphQLList(require('./keyword_type')),
			description: 'Keywords for the business',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await Keyword.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		followers: {
			type: new GraphQLList(require('./user_type')),
			description: 'List of followers for a user',
			args: { ids: { type: new GraphQLList(GraphQLID) } },
			async resolve(parentValue, { ids }) {
				try {
					return await User.find({ _id: { $in: ids } });
				} catch (err) {
					console.log(err);
				}
			},
		},
		website: {
			type: GraphQLString,
			description: 'Business website',
		},
		facebook: {
			type: GraphQLString,
			description: 'Business facebook',
		},
		linkedin: {
			type: GraphQLString,
			description: 'Business linkedin',
		},
		twitter: {
			type: GraphQLString,
			description: 'Business twitter',
		},
		instagram: {
			type: GraphQLString,
			description: 'Business instagram',
		},
	}),
});

module.exports = BusinessType;
