const router = require('express').Router();

const hello = require('../controllers/hello');
const auth = require('../controllers/auth');
const patientRecord = require('../controllers/storage/patientRecords');
const patient = require('../controllers/storage/patients');
const multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
const tempHandler = require('../controllers/storage/tempFileHandler');
const ar = require('../controllers/accessibility/adminRequests');
const access = require('../controllers/accessibility/userAccess');
const logs = require('../controllers/activity');
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
router.get('/init', isLoggedin, auth.init);

//* Patient Record Routes
router.post('/addpatientrecord', isLoggedin, patientRecord.addPatientRecord);
router.post('/plain', isLoggedin, patientRecord.getPlaintext);
router.post('/removerecord', isLoggedin, patientRecord.removeRecord);
router.get('/records/:patientID', isLoggedin, patientRecord.getPatientRecords);
router.get(
	'/record/:recordID',
	isLoggedin,
	patientRecord.getRecordAndReturnHash
);
router.post('/download', isLoggedin, patientRecord.retrieveRecordFromIPFS);

//* Patient Routes
router.post('/registerpatient', isLoggedin, patient.registerPatient);
router.get('/patientlist', isLoggedin, patient.fetchPatients);
router.get('/patient/:patientID', isLoggedin, patient.fetchPatientDetails);

//* Temp File Upload Handler
router.post(
	'/upload',
	isLoggedin,
	upload.single('file'),
	tempHandler.uploadFileToTempDirectory
);
router.post('/remove', isLoggedin, tempHandler.deleteTempFile);
router.post('/buffer', isLoggedin, tempHandler.fetchBuffer);

//* Admin controllers
router.post('/requestaccess', ar.addAdminRequest);
router.get('/admin/getrequests', isLoggedin, ar.getAdminRequests);
router.post('/admin/acceptadmin', isLoggedin, ar.acceptAdmin);
router.post('/admin/rejectadmin', isLoggedin, ar.rejectAdmin);

//* Activity Log
router.get('/admin/getactivity', isLoggedin, logs.activityLog);

//* Access Controllers
router.post('/admin/register', isLoggedin, access.addUserAccess);
router.post('/admin/revoke', isLoggedin, access.revokeAccess);
router.post('/admin/users', isLoggedin, access.getUserFromSameHospital);

module.exports = router;
