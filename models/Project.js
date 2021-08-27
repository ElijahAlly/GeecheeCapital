const mongoose = require('mongoose');
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
	address: {
		type: ObjectId,
		ref: 'Address',
	},
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
	blogs: [
		{
			type: ObjectId,
			ref: 'ProjectBlog',
		},
	],
	files: [
		{
			type: ObjectId,
			ref: 'File',
		},
	],
	// not nessasary, can just loop through files on frontend and check which type the file is
	// images: [
	// 	{
	// 		type: ObjectId,
	// 		ref: 'File',
	// 	},
	// ],
	// videos: [
	// 	{
	// 		type: ObjectId,
	// 		ref: 'File',
	// 	},
	// ],
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
