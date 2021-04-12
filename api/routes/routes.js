const router = require('express').Router();

const hello = require('../controllers/hello');
function isLoggedin(req, res, next) {
	if (req.session) {
		if (req.session.logged_in == true) {
			next();
		} else {
			return res.send({ success: true, data: 'User Not Logged in' });
		}
	} else {
		return res.send({ success: true, data: 'User Not Logged in' });
	}
}

router.get('/hello', hello.hello);

module.exports = router;
