import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import AdminNavbar from '../components/adminNavbar';
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
import Loader from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core/styles';
import PatientCard from '../components/patientCard';
import { get } from '../utils/api';
import ActivityCard from '../components/activityCard';

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
const AdminActivityPage = inject('loginStore')(
	observer(({ loginStore }) => {
		const [primaryCheck, setPrimaryCheck] = useState(false);
		const classes = useStyles();
		const [activity, setActivity] = useState({ success: false, data: [] });
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			if (!primaryCheck) {
				setPrimaryCheck(true);
				loginStore.getProfile();
			}
		}, [loginStore, primaryCheck]);

		useEffect(() => {
			get('/api/admin/getactivity').then((data) => {
				setActivity(data);
				setLoading(false);
			});
		}, []);

		const renderCards = (activity) => {
			const data = activity.data;

			const indents = [];

			for (let index = 0; index < data.length; index++) {
				indents.push(
					<ActivityCard
						timestamp={data[index].timestamp}
						name={data[index].name}
						activity={data[index].activity}
					/>
				);
			}
			return indents;
		};

		return loginStore.profileSet ? (
			<div>
				<AdminNavbar />

				<Container component="main" maxWidth="m" alignItems="center">
					<CssBaseline />
					<div className={classes.paper}>
						<Typography variant="h4" component="h2">
							Activity Logs
						</Typography>

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
						) : activity.data.length == 0 ? (
							<Container
								component="main"
								maxWidth="m"
								alignItems="center"
							>
								<CssBaseline />
								<div className={classes.paper}>
									<Typography variant="h5" component="h2">
										No Activity Logs Found
									</Typography>
								</div>
							</Container>
						) : (
							<div className={classes.paper}>
								{renderCards(activity)}
							</div>
						)}
					</div>
				</Container>
			</div>
		) : null;
	})
);
export default AdminActivityPage;
