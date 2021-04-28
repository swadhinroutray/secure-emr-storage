import { makeObservable, observable, action } from 'mobx';
import { get, post } from '../utils/api';
import {
	validateRequired,
	validateWithError,
	chainValidations,
} from '../utils/validation';
import { toast } from 'react-toastify';

class userModel {
	name = {
		value: '',
		error: '',
	};
	email = {
		value: '',
		error: '',
	};
	password = {
		value: '',
		error: '',
	};
	role = {
		value: '',
		error: '',
	};
	contact = {
		value: '',
		error: '',
	};
	hospital = {
		value: '',
		error: '',
	};
	message = {
		value: '',
		error: '',
	};
	successful = false;

	setMessage = (val) => {
		this.message.value = val;
	};
	setField = (field, val) => {
		this[field].value = val;
		// console.log(field, 'val', val);
		let err = '';
		err = registerValidator[field](val);

		this[field].error = err;
	};
	hasErrors = () => {
		return [
			this.name,
			this.role,
			this.password,
			this.email,
			this.contact,
			this.hospital,
		].some((field) => field.error.length > 0);
	};

	validateAll = () => {
		this.name.error = registerValidator['name'](this.name.value);
		this.password.error = registerValidator['password'](
			this.password.value
		);
		this.email.error = registerValidator['email'](this.email.value);
		const regexp = new RegExp(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		if (!regexp.test(this.email.value)) {
			this.email.error = 'Invalid Email Address';
			return;
		}

		//add regex for both

		this.contact.error = registerValidator['contact'](this.contact.value);
		this.hospital.error = registerValidator['hospital'](
			this.hospital.value
		);
		this.role.error = registerValidator['role'](this.role.value);
	};

	register = () => {
		this.validateAll();
		if (this.hasErrors()) {
			console.log('error');
			return;
		}
		const postData = {
			name: this.name.value.trim(),
			password: this.password.value.trim(),
			email: this.email.value.trim(),
			contact: this.contact.value.trim(),
			hospital: this.hospital.value.trim(),
			role: this.role.value,
		};
		post(`/api/register`, postData).then((res) => {
			console.log(res);

			if (res.success) {
				this.setMessage('Registered successfully!');
				this.successful = true;
				toast('Registered Successfully', {
					position: 'top-right',
					autoClose: 4000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				return;
			}

			this.setMessage('Something went wrong please try again');
		});
	};
	constructor() {
		makeObservable(this, {
			name: observable,
			email: observable,
			password: observable,
			contact: observable,
			hospital: observable,
			message: observable,
			successful: observable,
			setField: action,
			setMessage: action,
			validateAll: action,
			register: action,
		});
	}
}

const userStore = new userModel();
export default userStore;

const registerValidator = {
	name: (name) => validateRequired(name, 'Name'),
	password: (username) => validateRequired(username, 'Password'),
	email: (email) => validateRequired(email, 'Email'),
	contact: (contact) => validateRequired(contact, 'Contact Number'),
	hospital: (hospital) => validateRequired(hospital, 'Hospital'),
	role: (role) => validateRequired(role, 'Role'),
};
