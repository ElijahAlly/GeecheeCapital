const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const EquitySchema = new Schema({
	owner: {
		type: ObjectId,
		ref: 'User',
	},
    percentage: {
        type: Number,
        required: true
    },
    shares: {
        type: Number,
        required: false
    },
    sellDate: {
        type: Date,
        required: false
    },
    transactions: [
        {
            type: ObjectId,
            ref: 'Transaction'
        }
    ]
});

module.exports = mongoose.model('Equity', EquitySchema);
