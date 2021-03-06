import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import AdminNavbar from '../components/adminNavbar';
import { CssBaseline, Typography, Container } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import { makeStyles } from '@material-ui/core/styles';
import { get } from '../utils/api';
import RequestCard from '../components/adminRequestCard';

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
const AdminRequestsPage = inject('loginStore')(
	observer(({ loginStore }) => {
		const [primaryCheck, setPrimaryCheck] = useState(false);
		const classes = useStyles();
		const [requests, setRequests] = useState({ success: false, data: [] });
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			if (!primaryCheck) {
				setPrimaryCheck(true);
				loginStore.getProfile();
			}
		}, [loginStore, primaryCheck]);

		useEffect(() => {
			get('/api/admin/getrequests').then((data) => {
				setRequests(data);
				setLoading(false);
			});
		}, []);

		const renderCards = (requests) => {
			const data = requests.data;

			const indents = [];

			for (let index = 0; index < data.length; index++) {
				indents.push(
					<RequestCard
						requestID={data[index].requestID}
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

				<Container component="main" maxWidth="m" alignItems="center">
					<CssBaseline />
					<div className={classes.paper}>
						<Typography variant="h4" component="h2">
							Admin Requests
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
						) : requests.data.length === 0 ? (
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
								{renderCards(requests)}
							</div>
						)}
					</div>
				</Container>
			</div>
		) : // ) : (
		// <Container component="main" maxWidth="m" alignItems="center">
		// 	<Loader
		// 		type="Puff"
		// 		color="#00BFFF"
		// 		height={100}
		// 		width={100}
		// 		timeout={3000}
		// 	></Loader>
		// </Container>
		// )
		null;
	})
);
export default AdminRequestsPage;
