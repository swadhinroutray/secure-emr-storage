const { activity } = require('../models/activitySchema');

async function Log(userID, name, msg) {
	try {
		const newActivity = new activity({
			userID: userID,
			name: name,
			activity: msg,
		});

		result = await newActivity.save();

		if (!result) {
			console.log('Error Logging');
			return;
		}
		return;
	} catch (error) {
		console.log(error);
		return;
	}
}

module.exports = {
	Log,
};
