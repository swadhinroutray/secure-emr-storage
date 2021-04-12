function sendResponse(res, data) {
	try {
		res.status(200).send({ success: true, data: data });
	} catch (error) {
		res.status(400).send({ success: false, data: 'An error occured!' });
	}
}

function sendError(res, errorData) {
	try {
		res.status(200).send({
			success: true,
			data: 'An error Occured + ' + errorData,
		});
	} catch (error) {
		console.log('Error Occured in util');
		res.status(400).send({
			success: false,
			data: 'Error Occured while sending error',
		});
	}
}

module.exports = {
	sendError,
	sendResponse,
};
