const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhoneTypeSchema = new Schema({
	type: {
		type: String,
        trim: true,
		required: true,
	},
});

module.exports = mongoose.model('PhoneType', PhoneTypeSchema);
