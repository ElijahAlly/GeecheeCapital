const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const TradelineSchema = new Schema({
	seller: {
		type: ObjectId,
		ref: 'User',
	},
    creditCardCompany: {
        type: String,
        required: true
    },
    dateOpened: {
        type: Date,
        required: true
    },
    reportingDate: {
        type: Date,
        required: true
    },
    creditLimit: {
        type: Number,
        required: true
    },
    transactions: [
        {
            type: ObjectId,
            ref: 'Transaction'
        }
    ]
});

module.exports = mongoose.model('Tradeline', TradelineSchema);
