import React, { useState } from 'react';
import {
	Button,
	Avatar,
	CssBaseline,
	Box,
	Typography,
	Container,
	TextField,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { post } from '../utils/api';
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

const RegisterPatitentForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const [contact, setContact] = useState('');
	const [BG, setBG] = useState('');

	const handleClick = async () => {
		const postData = {
			name: name,
			email: email,
			contact: contact,
			birthday: birthday,
			bloodGroup: BG,
		};
		post(`/api/registerpatient`, postData).then((res) => {
			// console.log(res);

			if (res.success) {
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
		});
	};
	const classes = useStyles();

	return (
		<div>
			<Navbar />

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
						Register Patient
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
							id="birthday"
							label="Birthday"
							name="birthday"
							autoComplete="birthday"
							autoFocus
							onChange={(e) => setBirthday(e.target.value)}
						/>

						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="bloodGroup"
							label="Blood Group"
							name="bloodGroup"
							autoComplete="bloodGroup"
							autoFocus
							onChange={(e) => setBG(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleClick}
						>
							Register
						</Button>
					</form>
				</div>
				<Box mt={8}>
					<Copyright />
				</Box>
			</Container>
		</div>
	);
};

export default RegisterPatitentForm;
