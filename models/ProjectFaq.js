const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const ProjectFaqSchema = new Schema({
	question: {
		type: String,
		trim: true,
		required: true,
	},
	answer: {
		type: String,
		trim: true,
		required: true,
	},
	author: {
		type: ObjectId,
		ref: 'User',
	},
	published: {
		type: Boolean,
		default: true,
	},
	order: {
		type: Number,
		required: false,
	},
	lastUpdatedOn: {
		type: Date,
		default: Date.now,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('ProjectFaq', ProjectFaqSchema);
