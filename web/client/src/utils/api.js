const axios = require('axios');
export const get = (url) =>
	fetch(url, {
		method: 'GET',
		credentials: 'include',
	}).then((res) => res.json());

export const post = (url, body) =>
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(body),
	}).then((res) => res.json());
export const postFormData = async (url, file) => {
	let data = new FormData();
	data.append('file', file);
	console.log(data);
	console.log(file);
	const response = await axios.post(url, data);
	console.log(response);
	return response;
};
