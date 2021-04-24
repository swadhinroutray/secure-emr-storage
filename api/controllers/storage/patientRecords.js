const { user } = require('../../models/userSchema');
const { record } = require('../../models/recordSchema');
var crypto = require('crypto-js');
const { uuid } = require('uuidv4');
const response = require('../../utils/response');

async function AESencryption(hash) {
	const cipherText = await crypto.AES.encrypt(
		hash,
		process.env.AES_SECRET_KEY
	).toString();

	return cipherText;
}
async function AESdecryption(hash) {
	const bytesText = await crypto.AES.decrypt(
		hash,
		process.env.AES_SECRET_KEY
	);
	const plainText = bytesText.toString(crypto.enc.Utf8);
	return plainText;
}
async function addPatientRecord(req, res) {
	try {
		const patientID = req.body.patientID;
		const name = req.body.name;
		const email = req.body.email;
		const contact = req.body.contact;
		const recordName = req.body.recordName;
		const transactionHash = req.body.transactionHash;

		//! Creation of encrypted Hash

		const encryptedHash = await AESencryption(transactionHash);
		const newRecord = new record({
			patientID: patientID,
			name: name,
			email: email,
			contact: contact,
			recordName: recordName,
			transactionHash: encryptedHash,
		});

		result = await newRecord.save();
		if (!result) {
			return response.sendError(res, 'An error Occured');
		}
		console.log(result);
		return response.sendResponse(res, result);
	} catch (error) {
		response.sendError(res, error);
	}
}
//! Test Plaintext route, utilisation in retrieving decrypting transaction hash
async function getPlaintext(req, res) {
	const hash = req.body.hash;
	const plaintext = await AESdecryption(hash);
	response.sendResponse(res, plaintext);
}
module.exports = {
	addPatientRecord,
	getPlaintext,
};
