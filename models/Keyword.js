const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeywordSchema = new Schema({
	name: {
		type: String,
        trim: true,
		required: true,
	},
});

module.exports = mongoose.model('Keyword', KeywordSchema);
