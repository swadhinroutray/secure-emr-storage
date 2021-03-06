import React, { Component } from 'react';
import SimpleStorageContract from '../contracts/SimpleStorage.json';
import getWeb3 from './getWeb3';

class Web3Page extends Component {
	state = { storageValue: 0, web3: null, accounts: null, contract: null };
	constructor(props) {
		super(props);
		this.runExample = this.runExample.bind(this);
	}
	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.

			const web3 = await getWeb3();
			console.log(web3);
			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			console.log(accounts);
			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = SimpleStorageContract.networks[networkId];
			const instance = new web3.eth.Contract(
				SimpleStorageContract.abi,
				deployedNetwork && deployedNetwork.address
			);

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState(
				{ web3, accounts, contract: instance }
				// this.runExample
			);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		}
	};

	runExample = async () => {
		const { accounts, contract, web3 } = this.state;

		// Stores a given value, 5 by default.
		var hashData;
		await contract.methods
			.set(10)
			.send({ from: accounts[0] })
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
		this.setState({ storageValue: response });
	};

	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className="App">
				<h1>Good to Go!</h1>
				<p>Your Truffle Box is installed and ready.</p>
				<h2>Smart Contract Example</h2>
				<p>
					If your contracts compiled and migrated successfully, below
					will show a stored value of 5 (by default).
				</p>
				<p>
					Try changing the value stored on <strong>line 40</strong> of
					App.js.
				</p>
				<button onClick={this.runExample}>Run Transaction</button>
				<div>The stored value is: {this.state.storageValue}</div>
			</div>
		);
	}
}

export default Web3Page;
