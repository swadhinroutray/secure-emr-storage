import { makeObservable, observable, action, autorun } from 'mobx';
import { get, post } from '../utils/api';
import {
	validateRequired,
	validateWithError,
	chainValidations,
} from '../utils/validation';
import { toast } from 'react-toastify';

class patientModel {
	name = {
		value: '',
		error: '',
	};
	email = {
		value: '',
		error: '',
	};

	patientID = {
		value: '',
		error: '',
	};

	contact = {
		value: '',
		error: '',
	};
	bloodGroup = {
		value: '',
		error: '',
	};
	birthday = {
		value: '',
		error: '',
	};
	records = [];
	patientSet = false;
	recordSet = false;
	successful = false;
	setField = (field, val) => {
		this[field].value = val;
		// console.log(this[field].value);
	};
	setPatientModel = (ID) => {
		get('/api/patient/' + ID).then(this.postPatientFetch);
	};

	postPatientFetch = (res) => {
		console.log(res);
		const {
			patientID,
			name,
			email,
			contact,
			bloodGroup,
			birthday,
		} = res.data;

		if (res.success) {
			this.name = name;
			this.patientID = patientID;
			this.contact = contact;
			this.email = email;
			this.bloodGroup = bloodGroup;
			this.birthday = birthday;
			this.patientSet = true;
			return;
		}
		console.log('Error Setting Patient Profile');
	};

	getPatientRecords = async (ID) => {
		await get('/api/records/' + ID).then(this.handleRecords);
	};
	handleRecords = (res) => {
		console.log(res.data);
		this.records = res.data;
		this.recordSet = true;
		return;
	};
	//
	constructor() {
		makeObservable(this, {
			email: observable,
			patientID: observable,
			name: observable,
			contact: observable,
			birthday: observable,
			bloodGroup: observable,
			setField: action,
			setPatientModel: action,
			postPatientFetch: action,
			records: observable,
			recordSet: observable,
			getPatientRecords: action,
			handleRecords: action,
		});
	}
}
const patientStore = new patientModel();
export default patientStore;
