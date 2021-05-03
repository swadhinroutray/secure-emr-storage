import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Navbar from '../components/Navbar';
import Records from '../contracts/Records.json';

import {
	TextField,
	Button,
	CssBaseline,
	Typography,
	Container,
} from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core/styles';
import Web3 from 'web3';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { get, post, postFormData } from '../utils/api';
import { uuid } from 'uuidv4';

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
		width: '50vh', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	heading: {
		marginTop: theme.spacing(4),
	},
	search: {
		marginTop: '2vh',
	},
}));

const Home = inject('loginStore')(
	observer(({ loginStore }) => {
		const [primaryCheck, setPrimaryCheck] = useState(false);
		const [account, setAccount] = useState('');
		const [contract, setContract] = useState('');
		const [web3, setWeb3] = useState(0);
		const [loader, setLoader] = useState(true);
		const [name, setName] = useState('');
		const [patientID, setPatientID] = useState('');
		const [patients, setPatients] = useState([]);
		const [recordName, setRecordName] = useState('');
		const [searchLoader, setSearchLoader] = useState(true);
		const [filename, setFileName] = useState('');
		const [ipfsHash, setIpfsHash] = useState('');
		const [hospitalName, setHospitalName] = useState('');
		const classes = useStyles();

		useEffect(() => {
			if (!primaryCheck) {
				setPrimaryCheck(true);
				loginStore.getProfile();
			}
		}, [loginStore, primaryCheck]);

		useEffect(() => {
			const setUpWeb3 = async () => {
				const web3 = new Web3(
					Web3.givenProvider || 'http://localhost:8545'
				);
				setWeb3(web3);
				const accounts = await web3.eth.getAccounts();
				setAccount(accounts[0]);
				const networkId = await web3.eth.net.getId();
				const deployedNetwork = Records.networks[networkId];
				const instance = new web3.eth.Contract(
					Records.abi,
					deployedNetwork && deployedNetwork.address
				);
				setContract(instance);
				setLoader(false);
			};
			setUpWeb3();
		}, []);

		useEffect(() => {
			get('/api/patientlist').then((data) => {
				const patientData = data.data;
				setPatients(patientData);
				console.log(data);
				setSearchLoader(false);
			});
		}, []);

		useEffect(() => {
			console.log(web3);
			console.log(account);
			console.log('Web3Injected');
		}, [web3, account]);

		const handleChange = (event, values) => {
			if (values) {
				setName(values._id.name);
				setPatientID(values._id.patientID);
			} else {
				setName('');
				setPatientID('');
			}
		};

		const captureFile = async (event) => {
			event.stopPropagation();
			event.preventDefault();
			const file = event.target.files[0];
			setFileName(file.name);

			const fileBuffer = await postFormData('/api/upload', file);
			console.log(fileBuffer.data.data);
			setIpfsHash(fileBuffer.data.data);
			const removeData = {
				filename: file.name,
			};
			post('/api/remove', removeData);
		};

		const createRecord = async (event) => {
			event.preventDefault();
			const recordID = uuid();
			var hashData;
			await contract.methods
				.createRecord(recordID, ipfsHash)
				.send({ from: account })
				.on('transactionHash', function (hash) {
					console.log(hash);
					hashData = hash;
					console.log(hashData);
				});

			const recordData = {
				patientID: patientID,
				recordID: recordID,
				name: name,
				recordName: recordName,
				transactionHash: hashData,
				hospital: hospitalName,
			};
			const response = post('/api/addpatientrecord', recordData);
			if (response.success === true) {
				console.log('Added Record successfully');
			} else {
				console.log('Record Addition failed :(');
			}
		};
		return loginStore.profileSet ? (
			<div>
				<Navbar />
				{loader && searchLoader ? (
					<div className={classes.paper}>
						<h1>Loading Web3</h1>
					</div>
				) : (
					<Container
						component="main"
						maxWidth="s"
						alignItems="center"
					>
						<CssBaseline />

						<div className={classes.paper}>
							<Typography
								className={classes.heading}
								component="h1"
								variant="h5"
							>
								Add Patient Record
							</Typography>
							<div className={classes.search}>
								<Autocomplete
									id="combo-box-demo"
									options={patients}
									getOptionLabel={(option) => option._id.name}
									style={{ width: '50vh' }}
									onChange={handleChange}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Patient Name"
											variant="outlined"
										/>
									)}
								/>
							</div>

							<form className={classes.form} noValidate>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									// id="recordName"
									label="Record Name"
									// name="recordName"
									// autoComplete="recordName"
									// autoFocus
									onChange={(e) =>
										setRecordName(e.target.value)
									}
								/>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									// id="recordName"
									label="Hosptal Name"
									// name="recordName"
									// autoComplete="recordName"
									// autoFocus
									onChange={(e) =>
										setHospitalName(e.target.value)
									}
								/>
								<Button variant="contained" component="label">
									Upload Report
									<input
										type="file"
										hidden
										onChange={captureFile}
									/>
								</Button>
								{/* <div>Uploaded File : {report.name}</div> */}
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									alignItems="center"
									className={classes.submit}
									onClick={createRecord}
								>
									Create Record
								</Button>
							</form>
						</div>
					</Container>
				)}
			</div>
		) : (
			<Loader
				type="Puff"
				color="#00BFFF"
				height={100}
				width={100}
				timeout={3000}
			/>
		);
	})
);
Home.displayName = 'Home Component';
export default Home;
