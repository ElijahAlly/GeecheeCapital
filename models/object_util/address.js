const address = {
    street: {
		type: String,
        trim: true,
		required: true,
	},
	streetLine2: {
		type: String,
        trim: true,
		required: false,
	},
	city: {
		type: String,
        trim: true,
		required: true,
	},
    county: {
        type: String,
        trim: true,
        required: false,
    },
	state: {
		type: String,
        trim: true,
		required: true,
	},
	country: {
		type: String,
        trim: true,
		required: true,
	},
	zip: {
		type: String,
		required: true,
	},
	primary: {
		type: Boolean,
		required: true,
        default: true
	},
    addressType: {
        type: String,
        required: true
    }
}

module.exports = address;