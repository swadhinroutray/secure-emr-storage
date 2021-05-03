const { activity } = require('../models/activitySchema');
const response = require('../utils/response');

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

async function activityLog(req, res) {
	try {
		result = await activity.find({}).sort({
			timestamp: -1,
		});
		if (!result) {
			return response.sendError(res, 'Error fetching Activity');
		}
		return response.sendResponse(res, result);
	} catch (error) {
		console.log(error);
		return response.sendError(res, error);
	}
}
module.exports = {
	Log,
	activityLog,
};
