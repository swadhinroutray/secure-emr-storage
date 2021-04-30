const fs = require('fs-extra');
const response = require('../../utils/response');
const path = require('path');
require('dotenv').config({ path: path.resolve('../../../.env') });
const ipfs = require('../../utils/ipfs');

async function uploadFileToTempDirectory(req, res) {
	try {
		const file = req.file;
		const uploadPath =
			process.env.UPLOAD_DIR_PATH + '/' + file.originalname;
		console.log(uploadPath);
		await fs.writeFile(uploadPath, file.buffer);
		await ipfs.add(file.buffer, function (err, file) {
			if (err) {
				console.log(err);
			}
			response.sendResponse(res, file[0].hash);
		});
	} catch (error) {
		response.sendError(res, error);
	}
}
async function deleteTempFile(req, res) {
	try {
		const fileName = req.body.filename.trim();
		const uploadPath = process.env.UPLOAD_DIR_PATH + '/' + fileName;

		await fs.remove(uploadPath);
		response.sendResponse(res, 'File Deleted Successfully');
	} catch (error) {
		response.sendError(res, error);
	}
}
async function fetchBuffer(req, res) {
	try {
		const fileName = req.body.filename;
		console.log(fileName);
		const buffer = await fs.readFileSync(
			process.env.UPLOAD_DIR_PATH + '/' + fileName
		);

		console.log(buffer);
		response.sendResponse(res, buffer);
	} catch (error) {
		response.sendError(res, error);
	}
}

module.exports = {
	uploadFileToTempDirectory,
	deleteTempFile,
	fetchBuffer,
};
