const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GumboPostSchema = new Schema({
    author: {
        type: ObjectId,
        ref: 'User'
    },
	story: {
		type: String,
		trim: true,
		required: true,
	},
	profileFeatured: {
		type: Boolean,
		default: true,
	},
	globallyFeatured: {
		type: Boolean,
		default: true,
	},
    visibility: {
        type: String,
        required: true
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
	status: {
		type: String,
		required: true,
	},
    comments: [
		{
			type: ObjectId,
			ref: 'GumboComment',
		},
	],
	keywords: [
		{
			type: ObjectId,
			ref: 'Keyword',
		},
	],
	category: [
		{
			type: ObjectId,
			ref: 'Category',
		},
	],
    order: {
        type: Number,
        required: false
    },
	createdOn: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('GumboPost', GumboPostSchema);
