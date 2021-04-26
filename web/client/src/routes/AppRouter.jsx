import React from 'react';
import { Provider } from 'mobx-react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Web3Page from '../pages/web3Page';
import LoginForm from '../pages/loginPage';
import loginStore from '../models/loginModel';
import userStore from '../models/userModel';

import { PrivateRoute } from './privateRoute';
import Home from '../pages/home';

function AppRouter() {
	return (
		<Provider loginStore={loginStore} userStore={userStore}>
			<Switch>
				<Route exact path={'/login'} component={LoginForm} />
				<PrivateRoute exact path={'/home'} component={Home} />
				<PrivateRoute exact path={'/web3'} component={Web3Page} />
				<Route exact path={'/'} component={LoginForm} />
			</Switch>
		</Provider>
	);
}

export default AppRouter;
