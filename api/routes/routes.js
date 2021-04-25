const router = require('express').Router();

const hello = require('../controllers/hello');
const auth = require('../controllers/auth');
const patientRecord = require('../controllers/storage/patientRecords');
const patient = require('../controllers/storage/patients');

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

//* Patient Record Routes
router.post('/addpatientrecord', isLoggedin, patientRecord.addPatientRecord);
router.post('/plainhash', isLoggedin, patientRecord.getPlaintext);
router.post('/removerecord', isLoggedin, patientRecord.removeRecord);
router.get('/records/:patientID', isLoggedin, patientRecord.getPatientRecords);

//* Patient Records
router.post('/registerpatient', isLoggedin, patient.registerPatient);
router.get('/patientlist', isLoggedin, patient.fetchPatients);
router.get('/patient/:patientID', isLoggedin, patient.fetchPatientDetails);

module.exports = router;
