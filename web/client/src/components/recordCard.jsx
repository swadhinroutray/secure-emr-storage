import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CssBaseline, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Web3 from 'web3';

import Loader from 'react-loader-spinner';
import Records from '../contracts/Records.json';
import { get, post } from '../utils/api';
import env from '../env.json';
import crypto from 'crypto-js';
const Styles = makeStyles({
	root: {
		minWidth: '70vh',
		marginTop: '2vh',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

//! Injection Of Web3 Required to download IPFS uploaded document
const RecordCard = (props) => {
	const [account, setAccount] = useState('');
	const [contract, setContract] = useState('');
	const [web3, setWeb3] = useState(0);
	const [loader, setLoader] = useState(true);

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

	const AESencryption = async (hash) => {
		const cipherText = await crypto.AES.encrypt(
			hash,
			env.AES_SECRET_KEY
		).toString();

		return cipherText;
	};
	async function AESdecryption(hash) {
		console.log(hash);
		const bytesText = await crypto.AES.decrypt(hash, env.AES_SECRET_KEY);
		const plainText = bytesText.toString(crypto.enc.Utf8);

		return plainText;
	}
	useEffect(() => {
		console.log(web3);
		console.log(account);
		console.log('Web3Injected');
	}, [web3, account]);
	const classes = Styles();
	// const history = useHistory();
	// const bull = <span className={classes.bullet}>•</span>;
	const handleClick = async (e) => {
		e.preventDefault();
		const recordID = props.recordID;
		const smartResponse = await contract.methods.getRecord(recordID).call();
		const encryptedIPFShash = await AESencryption(smartResponse[1]);

		const downloadData = {
			hash: encryptedIPFShash,
		};
		console.log(encryptedIPFShash);
		const response = await post('/api/download', downloadData);
		const url = await AESdecryption(response.data);
		window.open(url, '_blank');
	};
	return loader ? (
		<Container component="main" maxWidth="s" alignItems="center">
			<CssBaseline />
			<div className={classes.paper}>
				<Loader type="Puff" color="#00BFFF" height={100} width={100} />
			</div>
		</Container>
	) : (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					Record ID: {props.recordID}
				</Typography>
				<Typography variant="h5" component="h2">
					Record Name: {props.recordName}
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={handleClick} size="small">
					Download
				</Button>
			</CardActions>
		</Card>
	);
};
export default RecordCard;
