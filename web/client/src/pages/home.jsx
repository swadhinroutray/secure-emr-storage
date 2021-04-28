import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Navbar from '../components/Navbar';
import SimpleStorageContract from '../contracts/SimpleStorage.json';

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
import Web3Page from './web3Page';
import Loader from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core/styles';
import Web3 from 'web3';
import SearchBar from '../components/searchBar';
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

const Home = inject('loginStore')(
	observer(({ loginStore }) => {
		const [primaryCheck, setPrimaryCheck] = useState(false);
		const [account, setAccount] = useState('');
		const [contract, setContract] = useState('');
		const [storageValue, setStorageValue] = useState(0);
		const [web3, setWeb3] = useState(0);
		const [loader, setLoader] = useState(true);
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
				const deployedNetwork =
					SimpleStorageContract.networks[networkId];
				const instance = new web3.eth.Contract(
					SimpleStorageContract.abi,
					deployedNetwork && deployedNetwork.address
				);
				setContract(instance);
				setLoader(false);
			};
			setUpWeb3();
		}, []);
		const runExample = async () => {
			var hashData;
			await contract.methods
				.set(10)
				.send({ from: account })
				.on('transactionHash', function (hash) {
					console.log(hash);
					hashData = hash;
				});
			console.log(hashData);
			const data = await web3.eth.getTransaction(hashData);
			console.log(data);
			// Get the value from the contract to prove it worked.
			const response = await contract.methods.get().call();
			console.log(response);
			// Update state with the result.
			setStorageValue(response);
		};
		return loginStore.profileSet ? (
			<div>
				<Navbar />
				{loader ? (
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
							{/* <Web3Page /> */} <h1>Register A Patient</h1>
							<SearchBar />
							<button onClick={runExample}>
								Run Transaction
							</button>
							<div>The stored value is: {storageValue}</div>
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
