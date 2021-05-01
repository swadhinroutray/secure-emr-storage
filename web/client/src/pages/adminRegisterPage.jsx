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

import AdminNavbar from '../components/adminNavbar';
import { get, post } from '../utils/api';

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

const AdminRegisterPage = inject('loginStore')(
	observer(({ loginStore }) => {
		const classes = useStyles();

		const [name, setName] = useState('');
		const [role, setRole] = useState(0);
		const [email, setEmail] = useState('');
		const [contact, setContact] = useState('');
		const [hospital, setHospital] = useState('');

		const register = async (e) => {
			e.preventDefault();
			const postData = {
				name: name,
				email: email,
				contact: contact,
				hospital: hospital,
				role: role,
			};
			post(`/api/admin/register`, postData).then((res) => {
				if (res.success) {
					alert(res.data);
				} else {
					alert('Error in registering user');
				}
			});
			setEmail('');
			setContact('');
			setName('');
			setRole(0);
		};

		return (
			<div>
				<AdminNavbar />

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
							Register User
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
								id="role"
								label="Role"
								name="role"
								autoComplete="role"
								autoFocus
								onChange={(e) => setRole(e.target.value)}
							/>

							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="hospital"
								label="Hospital"
								name="hospital"
								autoComplete="hospital"
								autoFocus
								onChange={(e) => setHospital(e.target.value)}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={register}
							>
								Register
							</Button>
						</form>
					</div>
				</Container>
			</div>
		);
	})
);

export default AdminRegisterPage;
