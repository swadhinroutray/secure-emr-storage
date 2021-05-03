const nodemailer = require('nodemailer');
const ses = require('nodemailer-ses-transport');
const aws = require('aws-sdk');
const path = require('path');

require('dotenv').config({ path: path.resolve('../../.env') });

// aws.config.loadFromPath('../mail/awsconfig.json');
const aws_json = require('./awsconfig.json');
aws.config.update({
	accessKeyId: aws_json.accessKeyId,
	secretAccessKey: aws_json.secretAccessKey,
	region: aws_json.region,
});
const transport = nodemailer.createTransport(
	ses({
		host: 'email-smtp.ap-south-1.amazonaws.com',
		port: 2525,
		auth: {
			user: process.env.USER,
			pass: process.env.PASS,
		},
	})
);

async function sendUserCredentials(email, name, pwd) {
	try {
		const html = `
        Hello ${name}<br>Here are your credentials for access to Secure EMR Storage<br>
        <b>Email: </b> ${email}
        <br>
        <b>Password: </b> ${pwd}
        <br>
        <b>
        Regards, <br>
        EMR Admin
        </b>    
        `;

		const message = {
			from: 'EMR ADMIN<swadhin.routray@gmail.com>',
			to: email,
			subject: 'User Credentials: ' + name,
			html,
		};
		await transport.sendMail(message, (err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Message sent' + info);
				return;
			}
		});
	} catch (error) {
		console.log(error);
	}
}

async function sendAdminRejected(email, name) {
	try {
		const html = `
        Hello ${name}<br>
        We are sorry to inform you that your request for access to <b>Secure EMR Storage</b> has been denied.
 
        <br>
        Regards, <br>
        EMR Admin
        </b>    
        `;
		const message = {
			from: 'EMR ADMIN<swadhin.routray@gmail.com>',
			to: email,
			subject: 'Admin Rejection: ' + name,
			html,
		};
		await transport.sendMail(message, (err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Message sent' + info);
				return;
			}
		});
	} catch (error) {
		console.log(error);
	}
}

async function sendAdminAccepted(email, name, pwd) {
	try {
		const html = `
        Hello ${name}<br>Here are your credentials for access to Secure EMR Storage<br>
        <b>Email: </b> ${email}
        <br>
        <b>Password: </b> ${pwd}
        <br>
        <br>
        <br>
        Regards, <br>
        EMR Admin
        </br>    
        `;
		const message = {
			from: 'EMR ADMIN<swadhin.routray@gmail.com>',
			to: email,
			subject: 'Admin Credentials: ' + name,
			html,
		};
		await transport.sendMail(message, (err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Message sent' + info);
				return;
			}
		});
	} catch (error) {
		console.log(error);
	}
}
async function sendAccessRevoked(email, name) {
	try {
		const html = `
        Hello ${name}<br>We are sorry to inform you that your access to Secure EMR Storage has been <b>revoked</b><br>
		In order to regain access, please get in touch with your hospital Admin.
		<br>
        <br>
        <br>
        Regards, <br>
        EMR Admin
        </br>    
        `;
		const message = {
			from: 'EMR ADMIN<swadhin.routray@gmail.com>',
			to: email,
			subject: 'EMR Access Revoked: ' + name,
			html,
		};
		await transport.sendMail(message, (err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Message sent' + info);
				return;
			}
		});
	} catch (error) {
		console.log(error);
	}
}
module.exports = {
	sendUserCredentials,
	sendAdminRejected,
	sendAdminAccepted,
	sendAccessRevoked,
};
