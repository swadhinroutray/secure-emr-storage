const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	employeeID: {
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
		//Defining a common  as explained in the README
		type: Number,
		required: true,
		default: 1,
	},
	contact: {
		// Phone numner
		type: String,
		required: true,
	},
	address: {
		type: String,
	},
	token: {
		type: String,
	},
});

const user = mongoose.model('user', userSchema);
