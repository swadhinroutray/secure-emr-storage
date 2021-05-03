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

const LoginForm = inject('loginStore')(
	observer(({ loginStore }) => {
		console.log(loginStore.loggedIn);
		const [primaryCheck, setPrimaryCheck] = useState(false);
		useEffect(() => {
			if (!primaryCheck) {
				setPrimaryCheck(true);
				loginStore.getProfile();
				// if (loginStore.loggedIn == false) {
				// 	return <Redirect to="/login" />;
				// }
			}
		}, [loginStore, primaryCheck]);
		const classes = useStyles();

		return loginStore.loggedIn === true ? (
			loginStore.profile.role === 1 ? (
				<Redirect to="/admin/home" />
			) : (
				<Redirect to="/home" />
			)
		) : (
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
						Sign in
					</Typography>
					<form className={classes.form} noValidate>
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
							onChange={(e) =>
								loginStore.setField('email', e.target.value)
							}
						/>
						<Typography>{loginStore['email'].error}</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(e) =>
								loginStore.setField('password', e.target.value)
							}
						/>
						<Typography>{loginStore['password'].error}</Typography>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={() => loginStore.login()}
						>
							Sign In
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
							color: 'red',
						}}
						to="/requestaccess"
						color="inherit"
						justifyContent="center"
					>
						<Typography
							variant="body1"
							color="textSecondary"
							align="center"
						>
							<b>Want to request access?</b>
						</Typography>
					</Link>
				</Box>
			</Container>
		);
	})
);

export default LoginForm;
