const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
	bloodGroup: {
		type: String,
		required: true,
	},
	birthday: {
		type: String,
	},
});

const patient = mongoose.model('patients', patientSchema);
module.exports = {
	patient,
};
