const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
	patientID: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	contact: {
		type: String,
		required: true,
	},
	recordName: {
		type: String,
		required: true,
	},
	transactionHash: {
		//! Encrypted using AES technology
		type: String,
		required: true,
	},
});

const record = mongoose.model('records', recordSchema);
module.exports = {
	record,
};
