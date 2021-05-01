const mongoose = require('mongoose');

const adminRequestSchema = new mongoose.Schema({
	requestID: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	contact: {
		// Phone numner
		type: String,
		required: true,
	},
	hospital: {
		type: String,
		required: true,
	},
});

const request = mongoose.model('requests', adminRequestSchema);

module.exports = {
	request,
};
