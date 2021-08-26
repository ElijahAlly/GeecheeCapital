const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectTypeSchema = new Schema({
	name: {
		type: String,
        trim: true,
		required: true,
	},
});

module.exports = mongoose.model('ProjectType', ProjectTypeSchema);
