import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import AdminNavbar from '../components/adminNavbar';
import {
	TextField,
	Button,
	CssBaseline,
	Box,
	Typography,
	Container,
} from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core/styles';
import { post } from '../utils/api';
import AdminHomeCard from '../components/adminHomeCard';
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(4),
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
const AdminHome = inject('loginStore')(
	observer(({ loginStore }) => {
		const [primaryCheck, setPrimaryCheck] = useState(false);
		const classes = useStyles();
		const [users, setUsers] = useState({ success: false, data: [] });
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			if (!primaryCheck) {
				setPrimaryCheck(true);
				loginStore.getProfile();
			}
		}, [loginStore, primaryCheck]);
		useEffect(() => {
			const postData = {
				hospital: loginStore.profile.hospital,
			};
			post('/api/admin/users', postData).then((data) => {
				console.log(data);
				setUsers(data);
				setLoading(false);
			});
		}, []);
		const renderCards = (users) => {
			const data = users.data;

			const indents = [];

			for (let index = 0; index < data.length; index++) {
				indents.push(
					<AdminHomeCard
						userID={data[index].userID}
						name={data[index].name}
						hospital={data[index].hospital}
					/>
				);
			}
			return indents;
		};
		return loginStore.profileSet ? (
			<div>
				<AdminNavbar />

				<Container component="main" maxWidth="s" alignItems="center">
					<CssBaseline />
					<div className={classes.paper}>
						<h1>Hello Admin from: {loginStore.profile.hospital}</h1>
						<h2>Here are your registered users</h2>
					</div>
					{loading ? (
						<Container
							component="main"
							maxWidth="m"
							alignItems="center"
						>
							<CssBaseline />
							<div className={classes.paper}>
								<Loader
									type="Puff"
									color="#00BFFF"
									height={100}
									width={100}
									timeout={3000}
								></Loader>
							</div>
						</Container>
					) : users.data.length == 0 ? (
						<Container
							component="main"
							maxWidth="m"
							alignItems="center"
						>
							<CssBaseline />
							<div className={classes.paper}>
								<Typography variant="h5" component="h2">
									No Pending Requests
								</Typography>
							</div>
						</Container>
					) : (
						<div className={classes.paper}>
							{renderCards(users)}
						</div>
					)}
				</Container>
			</div>
		) : null;
	})
);
export default AdminHome;
