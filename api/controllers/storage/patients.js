const { patient } = require('../../models/patientSchema');
const response = require('../../utils/response');
const { uuid } = require('uuidv4');

async function registerPatient(req, res) {
	try {
		const patientID = uuid();
		const name = req.body.name;
		const email = req.body.email;
		const contact = req.body.contact;
		const bloodGroup = req.body.bloodGroup;
		const birthday = req.body.birthday;

		const newPatient = new patient({
			patientID: patientID,
			name: name,
			email: email,
			contact: contact,
			bloodGroup: bloodGroup,
			birthday: birthday,
		});
		result = await newPatient.save();
		if (!result) {
			return response.sendError(res, 'An error Occured');
		}
		return response.sendResponse(res, result);
	} catch (error) {
		response.sendError(res, error);
	}
}
async function fetchPatients(req, res) {
	try {
		result = await patient.aggregate([
			{
				$group: {
					_id: { patientID: '$patientID', name: '$name' },
				},
			},
		]);
		if (!result) {
			return response.sendError(res, 'An error Occured');
		}
		// console.log(result);

		response.sendResponse(res, result);
	} catch (error) {
		response.sendError(res, error);
	}
}
module.exports = {
	fetchPatients,
	registerPatient,
};
