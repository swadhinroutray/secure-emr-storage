import { makeObservable, observable, action, autorun } from 'mobx';
import { get, post } from '../utils/api';
import {
	validateRequired,
	validateWithError,
	chainValidations,
} from '../utils/validation';

class loginModel {
	email = {
		value: '',
		error: '',
	};
	password = {
		value: '',
		error: '',
	};
	message = {
		value: '',
		error: '',
	};
	profile = {};
	profileSet = false;
	loggedIn = false;
	loading = true;
	setField = (field, val) => {
		this[field].value = val;
		// console.log(this[field].value);
		let err = '';
		err = loginValidator[field](val);

		this[field].error = err;
	};
	hasErrors = () => {
		return [this.password, this.email].some(
			(field) => field.error.length > 0
		);
	};

	validateAll = () => {
		this.password.error = loginValidator['password'](this.password.value);
		this.email.error = loginValidator['email'](this.email.value);
		const regexp = new RegExp(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		if (!regexp.test(this.email.value)) {
			this.email.error = 'Invalid Email Address';
			return;
		}
	};
	setMessage = (val) => {
		this.message.value = val;
	};
	login = () => {
		this.validateAll();
		if (this.hasErrors()) {
			console.log('error');
			return;
		}
		const postData = {
			password: this.password.value.trim(),
			email: this.email.value.trim(),
		};
		console.log('login hit');

		post(`/api/login`, postData).then(this.postLogin);
	};

	postLogin = (res) => {
		// console.log(res.data);
		// this.loading = true;
		if (res.success && res.data !== 'User Not Logged in') {
			const { userID, name, email, contact, hospital, role } = res.data;

			this.profile.userID = userID;
			this.profile.name = name;
			this.profile.email = email;
			this.profile.contact = contact;
			this.profile.hospital = hospital;
			this.profile.role = role;
			this.loggedIn = true;
			this.profileSet = true;
			this.loading = false;
			// window.location = '/home';
			return;
		}
		if (res.data === 'User Not Logged in') {
			this.loggedIn = false;
			this.profileSet = false;
		}
		if (res.data === 'Invalid Credentials') {
			this.setMessage('Invalid Credentials');
		}
		this.loading = false;
		return;
	};

	logout() {
		get('/api/logout').then(this.logoutControl);
	}

	logoutControl = (res) => {
		console.log(res);
		if (res.success) {
			this.loggedIn = false;
			this.profileSet = false;
			this.loading = false;
		}
		// window.location = '/login';
	};
	getProfile() {
		get('/api/init').then(this.postLogin);
	}
	constructor() {
		makeObservable(this, {
			email: observable,
			message: observable,
			password: observable,
			profile: observable,
			profileSet: observable,
			loggedIn: observable,
			setField: action,
			setMessage: action,
			login: action,
			logout: action,
			logoutControl: action,
			getProfile: action,
			loading: observable,
		});
	}
}

const loginStore = new loginModel();
var disposer = autorun(() => console.log(loginStore.loggedIn));

export default loginStore;
const loginValidator = {
	email: (email) =>
		chainValidations(
			validateRequired(email, 'Email'),
			validateWithError(email, 'Invalid Email')
		),
	password: (password) => validateRequired(password, 'Password'),
};
