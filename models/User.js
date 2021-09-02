const mongoose = require('mongoose');
const address = require('./object_util/address');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
	firstName: {
		type: String,
		trim: true,
		required: true,
	},
	lastName: {
		type: String,
		trim: true,
		required: true,
	},
	password: {
		type: String,
		trim: true,
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
	primaryEmail: {
		type: String,
		trim: true,
		required: true,
	},
	emails: [
		{
			type: String,
			trim: true,
		},
	],
	primaryAddress: address,
	addresses: [
		address,
	],
	files: [
		{
			type: ObjectId,
			ref: 'File',
		},
	],
	profilePic: {
		type: ObjectId,
		ref: 'File',
	},
	bio: {
		type: String,
		required: false,
		maxLength: 200,
	},
	followers: [
		{
			type: ObjectId,
			ref: 'User',
		},
	],
	following: [
		{
			type: ObjectId,
			ref: 'User',
		},
	],
	projects: [
		{
			type: ObjectId,
			ref: 'Project',
		},
	],
	likedProjects: [
		{
			type: ObjectId,
			ref: 'Project',
		},
	],
	projectComments: [
		{
			type: ObjectId,
			ref: 'ProjectComment',
		},
	],
	likedProjectComments: [
		{
			type: ObjectId,
			ref: 'ProjectComment',
		},
	],
	projectsInvestedIn: [
		{
			type: ObjectId,
			ref: 'Project',
		},
	],
	followedProjects: [
		{
			type: ObjectId,
			ref: 'Project',
		},
	],
	projectMemberships: [
		{
			type: ObjectId,
			ref: 'Project',
		},
	],
	tradelines: [
		{
			type: ObjectId,
			ref: 'Tradeline'
		}
	],
	createdOn: {
		type: Date,
		default: Date.now,
	},
});

// convert _id => id (remove underscore)
// async e.g. => const user = await User.findById(<user_id>).convertId();

// UserSchema.method('convertId', function() {
//     var obj = this.toObject();

//     obj.id = obj._id;
//     delete obj._id;

//     return obj;
// });

module.exports = User = mongoose.model('User', UserSchema);
