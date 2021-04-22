const router = require('express').Router();

const hello = require('../controllers/hello');
const auth = require('../controllers/auth');
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
//* Test Routes
router.get('/hello', hello.hello);

//* Authentication Routes
router.post('/register', auth.Register);
router.post('/login', auth.Login);
router.get('/logout', isLoggedin, auth.Logout);

module.exports = router;
