import React from 'react';
import { Provider } from 'mobx-react';
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

function AppRouter() {
	return (
		<Provider
			loginStore={loginStore}
			userStore={userStore}
			patientStore={patientStore}
		>
			<Switch>
				<Route path={'/login'} component={LoginForm} />
				<PrivateRoute path={'/home'} component={Home} />
				<PrivateRoute path={'/web3'} component={Web3Page} />

				<PrivateRoute path={'/patients'} component={Patients} />
				<PrivateRoute path={'/:patientID'} component={PatientProfile} />

				<AdminRoute path={'/admin/home'} component={AdminHome} />

				<Route exact path={'/'} component={LoginForm} />
			</Switch>
		</Provider>
	);
}

export default AppRouter;
