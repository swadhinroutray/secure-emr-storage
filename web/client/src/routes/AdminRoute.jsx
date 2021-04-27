import { inject, observer } from 'mobx-react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import loginStore from '../models/loginModel';

export const AdminRoute = inject('loginStore')(
	observer(({ component: Component, ...rest }) => {
		return !loginStore.loggedIn ? (
			<Redirect to="/login" />
		) : loginStore.profile.role === 1 ? (
			<Route
				path={rest.path}
				render={(props) => {
					return <Component {...props} />;
				}}
			></Route>
		) : (
			<Redirect to="/home" />
		);
	})
);
