import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Navbar from '../components/Navbar';
import { Link, Redirect, useHistory } from 'react-router-dom';
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
import PatientCard from '../components/patientCard';
import { get } from '../utils/api';

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
const Patients = inject('loginStore')(
	observer(({ loginStore }) => {
		const [primaryCheck, setPrimaryCheck] = useState(false);
		const classes = useStyles();
		const [patients, setPatients] = useState({ success: false, data: [] });
		const [loading, setLoading] = useState(true);
		useEffect(() => {
			if (!primaryCheck) {
				setPrimaryCheck(true);
				loginStore.getProfile();
			}
		}, [loginStore, primaryCheck]);

		useEffect(() => {
			get('/api/patientlist').then((data) => {
				setPatients(data);
				setLoading(false);
				console.log(data);
			});
		}, []);

		const renderCards = (patients) => {
			const data = patients.data;

			console.log(data[0]);
			const indents = [];

			for (let index = 0; index < data.length; index++) {
				indents.push(
					<PatientCard
						name={data[index]._id.name}
						patientID={data[index]._id.patientID}
					/>
				);
			}
			return indents;
		};

		return loginStore.profileSet ? (
			<div>
				<Navbar />

				<Container component="main" maxWidth="m" alignItems="center">
					<CssBaseline />
					<div className={classes.paper}>
						<Typography variant="h4" component="h2">
							Patient Page
						</Typography>

						{loading ? (
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
							<div className={classes.paper}>
								{renderCards(patients)}
							</div>
						)}
					</div>
				</Container>
			</div>
		) : // ) : (
		// <Container component="main" maxWidth="m" alignItems="center">
		// 	<Loader
		// 		type="Puff"
		// 		color="#00BFFF"
		// 		height={100}
		// 		width={100}
		// 		timeout={3000}
		// 	></Loader>
		// </Container>
		// )
		null;
	})
);
export default Patients;
