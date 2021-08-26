const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const FileSchema = new Schema({
	author: {
        type: ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    path: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true
    },
    size: {
        type: Number,
        required: false
    },
    serverName: {
        type: String,
        required: false
    },
    serverId: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    order: {
        type: Number,
        required: false
    },
    active: {
        type: Boolean,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    lastUpdatedOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('File', FileSchema);
