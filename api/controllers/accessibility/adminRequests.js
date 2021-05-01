const { request } = require('../../models/adminRequestSchema');

const { uuid } = require('uuidv4');
const response = require('../../utils/response');

async function addAdminRequest(req, res) {
	try {
		const name = req.body.name;
		const email = req.body.email;
		const contact = req.body.contact;
		const hospital = req.body.hospital;

		const requestID = uuid();

		const newRequest = new request({
			name: name,
			email: email,
			contact: contact,
			hospital: hospital,
			requestID: requestID,
		});
		var result = await newRequest.save();
		if (!result) {
			return response.sendError(res, 'Error Facilitating your request');
		}
		//   console.log(result);
		return response.sendResponse(
			res,
			'Your request was submitted successfully and is under review.'
		);
	} catch (error) {
		console.log(error);
		return response.sendError(res, error);
	}
}
async function getAdminRequests(req, res) {
	try {
		result = await request.find({});
		if (!result) {
			return response.sendError(res, 'Error Facilitating your request');
		}
		return response.sendResponse(res, result);
	} catch (error) {
		console.log(error);
		return response.sendError(res, error);
	}
}
module.exports = {
	addAdminRequest,
	getAdminRequests,
};
