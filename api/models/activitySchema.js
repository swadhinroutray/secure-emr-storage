const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		required: true,
		default: new Date(),
	},
	activity: {
		type: String,
		required: true,
	},
});

const activity = mongoose.model('activities', activitySchema);
module.exports = {
	activity,
};
