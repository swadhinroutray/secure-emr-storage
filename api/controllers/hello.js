const response = require('../utils/response');
async function hello(req, res) {
	try {
		return response.sendResponse(res, 'Hello');
	} catch (error) {
		console.log(error);
		return response.sendError(error);
	}
}

module.exports = {
	hello,
};
