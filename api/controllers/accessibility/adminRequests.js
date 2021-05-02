const { request } = require('../../models/adminRequestSchema');
const { user } = require('../../models/userSchema');
const { uuid } = require('uuidv4');
const response = require('../../utils/response');
const mail = require('../../mail/mailer');
const { Log } = require('../activity');
const bcrypt = require('bcryptjs');

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
async function rejectAdmin(req, res) {
	try {
		const requestID = req.body.requestID;
		result = await request.findOneAndDelete({
			requestID: requestID,
		});
		if (!result) {
			return response.sendError(res, 'Error rejecting request');
		}

		await mail.sendAdminRejected(result.email, result.name);
		await Log(
			req.session.userID,
			req.session.name,
			'Rejected Admin Request with requestID: ' + requestID
		);
		return response.sendResponse(res, 'Rejected user successfully');
	} catch (error) {
		console.log(error);
		return response.sendError(res, error);
	}
}
async function acceptAdmin(req, res) {
	try {
		const requestID = req.body.requestID;
		result = await request.findOneAndDelete({
			requestID: requestID,
		});
		if (!result) {
			return response.sendError(res, 'Error rejecting request');
		}

		const userID = uuid();
		const name = result.name;
		const role = 1;
		const hospital = result.hospital;
		const contact = result.contact;
		const email = result.email;
		const pwd = uuid();
		console.log(pwd);
		const salt = await bcrypt.genSalt(parseInt(process.env.SALT_FACTOR));

		bcrypt.hash(pwd, salt).then(async (hash) => {
			const newUser = new user({
				userID: userID,
				name: name.trim(),
				email: email.trim(),
				password: hash,
				role: role,
				contact: contact.trim(),
				token: uuid(),
				hospital: hospital.trim(),
			});

			var result = await newUser.save();
			if (!result) {
				return response.sendError(res, 'Error Registering new User');
			}
			await mail.sendAdminAccepted(email, name, pwd);
			await Log(
				req.session.userID,
				req.session.name,
				'Accepted admin with userID: ' + userID
			);
			return response.sendResponse(
				res,
				'The admin has been registed and his credentials have been sent to his email'
			);
		});
	} catch (error) {
		console.log(error);
		return response.sendError(res, error);
	}
}
module.exports = {
	addAdminRequest,
	getAdminRequests,
	rejectAdmin,
	acceptAdmin,
};
