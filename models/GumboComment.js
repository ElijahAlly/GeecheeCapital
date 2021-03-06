const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const GumboCommentSchema = new Schema({
    gumboId: {
        type: ObjectId,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true
    },
    body: {
        type: String,
        trim: true,
        required: true,
    },
    likes: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    dislikes: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    lastUpdatedOn: {
        type: Date,
		default: Date.now,
    },
    createdOn: {
		type: Date,
		default: Date.now,
	}
});

module.exports = mongoose.model('GumboComment', GumboCommentSchema);
