const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const TransactionSchema = new Schema(
	{
		buyer: { 
            type: ObjectId, 
            ref: 'User' 
        },
		chargedAmount: { 
            type: Number, 
            required: true 
        },
		currency: { 
            type: String, 
            required: true 
        },
		status: { 
            type: String, 
            required: false 
        },
		refundPending: { 
            type: Boolean, 
            required: true, 
            default: false 
        },
		status: { 
            type: String, 
            required: false 
        },
		purchaseDate: { 
            type: Date, 
            required: true 
        },
		purchaseTimeStamp: { 
            type: Date, 
            required: true 
        },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
