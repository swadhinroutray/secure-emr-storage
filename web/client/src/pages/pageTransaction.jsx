import React, { useState, useEffect } from 'react';
import SimpleStorageContract from '../contracts/SimpleStorage.json';
import getWeb3 from './getWeb3';
const Web3Transaction = inject('loginStore')(
	observer(({ loginStore }) => {
		const [web3, setWeb3] = useState(null);
		const [storageValue, setstorageValue] = useState(0);
		const [accounts, setAccounts] = useState(null);
		const [contracts, setContracts] = useState(null);
		useEffect(async () => {
			const Web3Provider = await getWeb3();
			const accountsProvided = await Web3Provider.eth.getAccounts();
			const networkId = await Web3Provider.eth.net.getId();
			const deployedNetwork = SimpleStorageContract.networks[networkId];
			const instance = new Web3Provider.eth.Contract(
				SimpleStorageContract.abi,
				deployedNetwork && deployedNetwork.address
			);

			setWeb3(Web3Provider);
			setAccounts(accountsProvided);
			setContracts(instance);
			const runExample = async () => {
				// Stores a given value, 5 by default.
				await contracts.methods.set(10).send({ from: accounts[0] });

				// Get the value from the contract to prove it worked.
				const response = await contract.methods.get().call();

				// Update state with the result.
				this.setState({ storageValue: response });
			};
		});
	})
);

export default Web3Transaction;
