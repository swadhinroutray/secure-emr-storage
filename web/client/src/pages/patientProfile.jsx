import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Navbar from '../components/Navbar';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import {
	TextField,
	Button,
	Avatar,
	CssBaseline,
	Box,
	Typography,
	Container,
} from '@material-ui/core';
import Web3Page from './web3Page';
import Loader from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core/styles';

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
const PatientProfile = inject(
	'patientStore',
	'loginStore'
)(
	observer(({ loginStore, patientStore }, props) => {
		const [primaryCheck, setPrimaryCheck] = useState(false);
		const classes = useStyles();
		const { patientID } = useParams();
		console.log(patientID);
		useEffect(() => {
			if (!primaryCheck) {
				setPrimaryCheck(true);
				loginStore.getProfile();
			}
		}, [loginStore, primaryCheck]);

		useEffect(() => {
			patientStore.setPatientModel(patientID);
		}, [patientStore]);

		useEffect(() => {
			patientStore.getPatientRecords(patientID);
		}, [patientStore]);

		useEffect(() => {
			console.log(patientStore.records);
		}, [patientStore]);

		return patientStore.patientSet && patientStore.recordSet ? (
			<div>
				<Navbar />

				<Container component="main" maxWidth="s" alignItems="center">
					<CssBaseline />
					<div className={classes.paper}>Hello</div>
				</Container>
			</div>
		) : (
			<div>
				<Navbar />
				<Container component="main" maxWidth="s" alignItems="center">
					<CssBaseline />
					<div className={classes.paper}>
						<Loader
							type="Puff"
							color="#00BFFF"
							height={100}
							width={100}
							timeout={3000}
						/>
					</div>
				</Container>
			</div>
		);
	})
);
export default PatientProfile;
