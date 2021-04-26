import { inject, observer } from 'mobx-react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import loginStore from '../models/loginModel';

export const PrivateRoute = inject('loginStore')(
	observer(({ component: Component, ...rest }) => {
		return !loginStore.loggedIn ? (
			<Redirect to="/login" />
		) : (
			<Route
				path={rest.path}
				render={(props) => {
					return <Component {...props} />;
				}}
			></Route>
		);
	})
);
