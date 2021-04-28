import React, { useEffect, useState } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Web3Page from '../pages/web3Page';
import LoginForm from '../pages/loginPage';
import loginStore from '../models/loginModel';
import userStore from '../models/userModel';
import patientStore from '../models/patientModel';
import AdminHome from '../pages/adminHome.jsx';
import Patients from '../pages/patientPage';
import PatientProfile from '../pages/patientProfile';

import { PrivateRoute } from './privateRoute';
import { AdminRoute } from './AdminRoute';

import Home from '../pages/home';
import RegisterPatitentForm from '../pages/registerPatient';
import {
	TextField,
	Button,
	Avatar,
	CssBaseline,
	Box,
	Typography,
	Container,
} from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(10),
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
const AppRouter = inject('loginStore')(
	observer(({ loginStore }) => {
		useEffect(() => {
			console.log(loginStore.loggedIn);
			loginStore.getProfile();
		}, [loginStore]);
		const classes = useStyles();

		return (
			<Provider
				loginStore={loginStore}
				userStore={userStore}
				patientStore={patientStore}
			>
				{loginStore.loading ? (
					<Container
						component="main"
						maxWidth="m"
						alignItems="center"
					>
						<CssBaseline />
						<div className={classes.paper}>
							<Loader
								type="Puff"
								color="#00BFFF"
								height={100}
								width={100}
								timeout={3000}
							></Loader>
						</div>
					</Container>
				) : (
					<Switch>
						<Route path={'/login'} component={LoginForm} />
						<PrivateRoute path={'/home'} component={Home} />
						<PrivateRoute path={'/web3'} component={Web3Page} />
						<PrivateRoute
							path={'/register'}
							component={RegisterPatitentForm}
						/>
						<PrivateRoute path={'/patients'} component={Patients} />
						<PrivateRoute
							path={'/:patientID'}
							component={PatientProfile}
						/>

						<AdminRoute
							path={'/admin/home'}
							component={AdminHome}
						/>

						<Route exact path={'/'} component={LoginForm} />
					</Switch>
				)}
			</Provider>
		);
	})
);

export default AppRouter;
