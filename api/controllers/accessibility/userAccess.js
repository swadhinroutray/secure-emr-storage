const { user } = require('../../models/userSchema');
const bcrypt = require('bcryptjs');
const response = require('../../utils/response');
const { Log } = require('../activity');
const { uuid } = require('uuidv4');
const mail = require('../../mail/mailer');
async function addUserAccess(req, res) {
	try {
		const userID = uuid();
		const name = req.body.name;
		const role = req.body.role;
		const hospital = req.body.hospital;
		const contact = req.body.contact;
		const email = req.body.email;
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
			await mail.sendUserCredentials(email, name, pwd);
			await Log(
				req.session.userID,
				req.session.name,
				'Added a new user with the userID: ' + userID
			);
			return response.sendResponse(
				res,
				'The user has been registed and his credentials have been sent to his email'
			);
		});
	} catch (error) {
		response.sendError(res, error);
	}
}
async function revokeAccess(req, res) {
	try {
		const userID = req.body.userID;
		result = await user.findOneAndDelete({
			userID: userID,
		});

		if (!result) {
			return response.sendError(res, 'Error Facilitating your request');
		}
		await mail.sendAccessRevoked(result.email, result.name);
		await Log(
			req.session.userID,
			req.session.name,
			'Removed a user with the userID: ' + userID
		);
		return response.sendResponse(res, 'Revoked Access Successfully');
	} catch (error) {
		response.sendError(res, error);
	}
}
async function getUserFromSameHospital(req, res) {
	try {
		const hospital = req.body.hospital;
		result = await user.find({
			hospital: hospital,
		});

		if (!result) {
			return response.sendError(res, 'Error Facilitating your request');
		}
		let array = [];
		for (let index = 0; index < result.length; index++) {
			if (result[index].userID == req.session.userID) {
				continue;
			}
			if (result[index].role == 1) {
				continue;
			}

			array.push(result[index]);
		}
		return response.sendResponse(res, array);
	} catch (error) {
		response.sendError(res, error);
	}
}
module.exports = {
	addUserAccess,
	revokeAccess,
	getUserFromSameHospital,
};
