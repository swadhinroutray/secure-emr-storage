const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	userID: {
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
	password: {
		type: String,
		required: true,
	},
	role: {
		type: Number,
		required: true,
		default: 1,
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
	token: {
		type: String,
	},
});

const user = mongoose.model('user', userSchema);

module.exports = {
	user,
};
