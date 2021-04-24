const { user } = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');
const response = require('../utils/response');

async function Register(req, res) {
	try {
		const salt = await bcrypt.genSalt(parseInt(process.env.SALT_FACTOR));
		bcrypt.hash(req.body.password, salt).then(async (hash) => {
			const newUser = new user({
				userID: uuid(),
				name: req.body.name.trim(),
				email: req.body.email.trim(),
				password: hash,
				role: req.body.role,
				contact: req.body.contact.trim(),
				token: uuid(),
				hospital: req.body.hospital.trim(),
			});

			var result = await newUser.save();
			if (!result) {
				return response.sendError(res, e);
			}
			//   console.log(result);
			return response.sendResponse(res, newUser);
		});
	} catch (e) {
		console.log(e);
		return response.sendError(res, e);
	}
}
async function Login(req, res) {
	try {
		if (req.session.logged_in == undefined || !req.session.logged_in) {
			result = await user.findOne({ email: req.body.email.trim() });
			// console.log(result)

			if (!result)
				return response.sendResponse(res, 'Invalid Credentials');
			else if (result.length == 0)
				return response.sendResponse(res, 'Invalid Credentials');
			else {
				resultVal = await bcrypt.compare(
					req.body.password,
					result.password
				);

				if (!resultVal)
					return response.sendResponse(res, 'Invalid Password');
				else {
					req.session.email = req.body.email;
					req.session.name = result.name;
					req.session.logged_in = true;
					req.session.userID = result.userID;
					// console.log(req.session);
					req.session.save(() => {
						response.sendResponse(res, result);
					});
				}
			}
		} else {
			console.log(req.session);
			return response.sendResponse(res, 'Already Logged In');
		}
	} catch (e) {
		console.log(e);
		return response.sendError(res, e);
	}
}

async function Logout(req, res) {
	try {
		await req.session.destroy();
		return response.sendResponse(res, 'Logged Out Successfully');
	} catch (error) {
		console.log(e);
		return response.sendError(res, e);
	}
}

module.exports = {
	Register,
	Login,
	Logout,
};
