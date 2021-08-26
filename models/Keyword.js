const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const KeywordSchema = new Schema({
	name: {
		type: String,
        trim: true,
		required: true,
	},
});

module.exports = mongoose.model('Keyword', KeywordSchema);
