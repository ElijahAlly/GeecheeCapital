const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const BusinessSchema = new Schema({
	owners: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    name: {
        type: String,
        trim: true,
        required: true
    },
    primaryAddress: {
		type: ObjectId,
		ref: 'Address',
	},
	addresses: [
		{
			type: ObjectId,
			ref: 'Address',
		},
	],
    primaryPhoneNumber: {
		number: { type: String, required: true, trim: true },
		phoneType: { type: ObjectId, ref: 'PhoneType' },
		primary: { type: Boolean, required: true },
	},
	phoneNumbers: [
		{
			number: { type: String, required: true, trim: true },
			phoneType: { type: ObjectId, ref: 'PhoneType' },
			primary: { type: Boolean, required: true },
		},
	],
    businessType: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    keywords: {
		data: [
			{
				type: ObjectId,
				ref: 'Keyword',
			},
		],
		required: true,
	},
    followers: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    website: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Business', BusinessSchema);
