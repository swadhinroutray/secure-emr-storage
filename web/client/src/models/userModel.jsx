import { makeObservable, observable, action } from 'mobx';
import { post } from '../utils/api';

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
		value: 0,
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
		console.log(this.field.value);
	};

	register = async () => {
		const postData = {
			name: this.name.value.trim(),
			email: this.email.value.trim(),
			contact: this.contact.value.trim(),
			hospital: this.hospital.value.trim(),
			role: this.role.value,
		};
		post(`/api/admin/register`, postData).then((res) => {
			console.log(res);

			if (res.success) {
				this.setMessage('Registered successfully!');
				this.successful = true;
				alert(this.message.value);
				return;
			}

			this.setMessage('Something went wrong please try again');
		});
	};
	constructor() {
		makeObservable(this, {
			name: observable,
			email: observable,
			contact: observable,
			hospital: observable,
			role: observable,
			message: observable,
			successful: observable,
			setField: action,
			setMessage: action,
			register: action,
		});
	}
}

const userStore = new userModel();
export default userStore;
