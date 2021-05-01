import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import {
	TextField,
	Button,
	Avatar,
	CssBaseline,
	Box,
	Typography,
	Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { get, post } from '../utils/api';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<a
				style={{ textDecoration: 'none' }}
				color="inherit"
				href="https://www.swadhinroutray.com"
			>
				Swadhin Routray
			</a>
		</Typography>
	);
}
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	heading: {
		marginTop: theme.spacing(4),
	},
}));

const RequestAccessPage = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [contact, setContact] = useState('');
	const [hospital, setHospital] = useState('');

	const handleClick = async (e) => {
		e.preventDefault();
		const postData = {
			name: name,
			email: email,
			contact: contact,
			hospital: hospital,
		};
		post(`/api/requestaccess`, postData).then((res) => {
			console.log(res);

			if (res.success) {
				alert(res.data);
			} else {
				console.log('An error Occured');
			}
		});
		setContact('');
		setName('');
		setHospital('');
		setEmail('');
	};
	const classes = useStyles();

	return (
		<div>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography
						className={classes.heading}
						component="h1"
						variant="h5"
					>
						<b>Centralised EMR Storage</b>
					</Typography>

					<Typography component="h1" variant="h5">
						Request Access
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="Name"
							label="Name"
							type="Name"
							id="Name"
							autoComplete="Name"
							onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="contact"
							label="Contact"
							name="contact"
							autoComplete="contact"
							autoFocus
							onChange={(e) => setContact(e.target.value)}
						/>

						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="hospital"
							label="Hospital"
							name="hospital"
							autoComplete="hospitak"
							autoFocus
							onChange={(e) => setHospital(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleClick}
						>
							Request Access
						</Button>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
				<Box mt={4}>
					<Link
						style={{
							textDecoration: 'none',
							color: 'black',
						}}
						to="/login"
						color="inherit"
						justifyContent="center"
					>
						<Typography
							variant="body1"
							color="textSecondary"
							align="center"
						>
							<b>Have access? Login here!</b>
						</Typography>
					</Link>
				</Box>
			</Container>
		</div>
	);
};

export default RequestAccessPage;
