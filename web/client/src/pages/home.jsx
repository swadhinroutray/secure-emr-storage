import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import Navbar from '../components/Navbar';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Web3Page from './web3Page';
const Home = inject('loginStore')(
	observer(({ loginStore }) => {
		const [primaryCheck, setPrimaryCheck] = useState(false);

		useEffect(() => {
			if (!primaryCheck) {
				setPrimaryCheck(true);
				loginStore.getProfile();
			}
		}, [loginStore, primaryCheck]);
		return (
			<div>
				<Navbar />
				<Web3Page />
			</div>
		);
	})
);
Home.displayName = 'Home Component';
export default Home;
