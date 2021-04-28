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
import RecordCard from '../components/recordCard';
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
const PatientProfile = inject(
	'patientStore',
	'loginStore'
)(
	observer(({ loginStore, patientStore }, props) => {
		const [primaryCheck, setPrimaryCheck] = useState(false);
		const classes = useStyles();
		const [records, setRecords] = useState([]);
		const [loading, setLoading] = useState(true);
		const [cardsLoaded, setCardsLoaded] = useState(false);
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
			get('/api/records/' + patientID).then((res) => {
				setRecords(res.data);
			});
			setCardsLoaded(true);
			setLoading(false);
		}, []);

		const renderCards = (records) => {
			const indents = [];
			if (records.length == 0) {
				return <Typography>No Records Found</Typography>;
			}
			for (let index = 0; index < records.length; index++) {
				indents.push(
					<RecordCard
						recordID={records[index].recordID}
						recordName={records[index].recordName}
					/>
				);
			}
			return indents;
		};

		// return patientStore.patientSet && patientStore.recordSet ? (
		return loading ? (
			<Container component="main" maxWidth="s" alignItems="center">
				<CssBaseline />
				<div className={classes.paper}>
					<Loader
						type="Puff"
						color="#00BFFF"
						height={100}
						width={100}
					/>
				</div>
			</Container>
		) : (
			<div>
				<Navbar />

				<Container component="main" maxWidth="s" alignItems="center">
					<CssBaseline />
					<div className={classes.paper}>
						{/* <h3>Patient Name: {patientStore.name}</h3>

						<h5>Patient ID: {patientStore.patientID}</h5> */}
						{cardsLoaded ? (
							renderCards(records)
						) : (
							<h1>Not loaded</h1>
						)}
					</div>
				</Container>
			</div>
		);
		// ) : (
		// 	<div>
		// 		<Navbar />
		// 		<Container component="main" maxWidth="s" alignItems="center">
		// 			<CssBaseline />
		// 			<div className={classes.paper}>
		// 				<Loader
		// 					type="Puff"
		// 					color="#00BFFF"
		// 					height={100}
		// 					width={100}
		// 				/>
		// 			</div>
		// 		</Container>
		// 	</div>
		// );
	})
);
export default PatientProfile;
