const { record } = require('../../models/recordSchema');
var crypto = require('crypto-js');
const { uuid } = require('uuidv4');
const response = require('../../utils/response');
const { Log } = require('../activity');

async function AESencryption(hash) {
	const cipherText = await crypto.AES.encrypt(
		hash,
		process.env.AES_SECRET_KEY
	).toString();

	return cipherText;
}
async function AESdecryption(hash) {
	console.log(hash);
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
		const recordName = req.body.recordName;
		const transactionHash = req.body.transactionHash;
		const hospital = req.body.hospital;
		const recordID = req.body.recordID;
		//! Creation of encrypted Hash

		const encryptedHash = await AESencryption(transactionHash);
		const newRecord = new record({
			recordID: recordID,
			patientID: patientID,
			name: name,
			recordName: recordName,
			transactionHash: encryptedHash,
			hospitalName: hospital,
		});

		result = await newRecord.save();
		if (!result) {
			return response.sendError(res, 'An error Occured');
		}
		await Log(
			req.session.userID,
			req.session.name,
			'Added a patient record with ID: ' + recordID
		);
		return response.sendResponse(res, result);
	} catch (error) {
		response.sendError(res, error);
	}
}
//! Plaintext route, utilisation in retrieving decrypted transaction hash
async function getPlaintext(req, res) {
	const hash = req.body.hash;
	const plaintext = await AESdecryption(hash);
	response.sendResponse(res, plaintext);
}

async function removeRecord(req, res) {
	try {
		const recordID = req.body.recordID;
		result = await record.remove({
			recordID: recordID,
		});
		if (!result) {
			return response.sendError(res, 'An error Occured');
		}
		await Log(
			req.session.userID,
			req.session.name,
			'Removed a patient record with ID: ' + recordID
		);
		return response.sendResponse(res, 'Record Deleted Successfully');
	} catch (error) {
		response.sendError(res, error);
	}
}

async function getPatientRecords(req, res) {
	try {
		const patientID = req.params.patientID;

		result = await record.find({
			patientID: patientID,
		});
		if (!result) {
			return response.sendError(res, 'An error Occured');
		}

		return response.sendResponse(res, result);
	} catch (error) {
		response.sendError(res, error);
	}
}

async function getRecordAndReturnHash(req, res) {
	try {
		const recordID = req.params.recordID;
		result = await record.findOne({
			recordID: recordID,
		});
		if (!result) {
			return response.sendError(res, 'An error Occured');
		}

		response.sendResponse(res, result.transactionHash);
	} catch (error) {
		response.sendError(res, error);
	}
}

async function retrieveRecordFromIPFS(req, res) {
	try {
		const encryptedIPFShash = req.body.hash;
		console.log(encryptedIPFShash);
		const decryptedIPFShash = await AESdecryption(encryptedIPFShash);
		const IPFS_URL = process.env.IPFS_BASE_URL + '/' + decryptedIPFShash;
		const encryptedURL = await AESencryption(IPFS_URL);
		response.sendResponse(res, encryptedURL);
	} catch (error) {
		response.sendError(res, error);
	}
}
module.exports = {
	addPatientRecord,
	getPlaintext,
	removeRecord,
	getPatientRecords,
	getRecordAndReturnHash,
	retrieveRecordFromIPFS,
};
