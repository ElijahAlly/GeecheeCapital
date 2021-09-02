const mongoose = require('mongoose');
const address = require('./object_util/address');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const ProjectSchema = new Schema({
	internalName: {
		type: String,
		trim: true,
		required: true,
	},
	publicName: {
		type: String,
		trim: true,
		required: true,
	},
	fundingGoal: {
		type: Number,
		required: true,
	},
	fundingDueDate: {
		type: Date,
		required: true,
	},
	minFundingToLaunch: {
		type: Number,
		required: true,
	},
	primaryPhoneNumber: {
		number: { type: String, required: true, trim: true },
		phoneType: { type: String, required: true, trim: true  },
		primary: { type: Boolean, default: true },
	},
	phoneNumbers: [
		{
			number: { type: String, required: true, trim: true },
			phoneType: { type: String, required: true, trim: true  },
			primary: { type: Boolean, required: true },
		},
	],
	allOrNothing: {
		type: Boolean,
		required: true,
	},
	story: {
		type: String,
		trim: true,
		required: true,
	},
	tagline: {
		type: String,
		trim: true,
		required: false,
	},
	valuation: {
		type: Number,
		required: true,
	},
	purchasePrice: {
		type: Number,
		required: false,
	},
	rehabCost: {
		type: Number,
		required: false,
	},
	primaryAddress: address,
	addresses: [
		address
	],
	owners: [
		{
			type: ObjectId,
			ref: 'User',
		},
	],
	contributors: [
		{
			type: ObjectId,
			ref: 'User',
		},
	],
	keywords: {
		data: [
			{
				type: ObjectId,
				ref: 'Keyword',
			},
		],
	},
	likes: [
		{
			type: ObjectId,
			ref: 'User',
		},
	],
	dislikes: [
		{
			type: ObjectId,
			ref: 'User',
		},
	],
	comments: [
		{
			type: ObjectId,
			ref: 'ProjectComment',
		},
	],
	files: [
		{
			type: ObjectId,
			ref: 'File',
		},
	],
	featuredImage: {
		type: ObjectId,
		ref: 'File',
	},
	featuredVideo: {
		type: ObjectId,
		ref: 'File',
	},
	projectTypes: {
		data: [
			{
				type: ObjectId,
				ref: 'ProjectType',
			},
		],
	},
	risks: [
		{
			type: String,
			trim: true,
		},
	],
	milestones: [
		{
			description: { type: String, trim: true, required: true },
			createdOn: {
				type: Date,
				default: Date.now,
			},
		},
	],
	faqs: [
		{
			type: ObjectId,
			ref: 'ProjectFaq',
		},
	],
	createdOn: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Project', ProjectSchema);
