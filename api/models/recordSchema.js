const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
	recordID: {
		type: String,
		required: true,
	},
	patientID: {
		type: String,
		required: true,
	},
	name: {
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
	hospitalName: {
		type: String,
		required: true,
	},
});

const record = mongoose.model('records', recordSchema);
module.exports = {
	record,
};
