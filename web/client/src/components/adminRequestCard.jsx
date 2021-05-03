import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { post } from '../utils/api';

const Styles = makeStyles({
	root: {
		minWidth: '50vh',
		marginTop: '2vh',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

const RequestCard = (props) => {
	const classes = Styles();
	// const bull = <span className={classes.bullet}>•</span>;
	const handleAcceptClick = async (e) => {
		e.preventDefault();
		const postData = {
			requestID: props.requestID,
		};
		post(`/api/admin/acceptadmin`, postData).then((res) => {
			if (res.success) {
				alert(res.data);
			} else {
				alert('Error in registering user');
			}
		});
	};
	const handleRejectClick = async (e) => {
		e.preventDefault();
		const postData = {
			requestID: props.requestID,
		};
		post(`/api/admin/rejectadmin`, postData).then((res) => {
			if (res.success) {
				alert(res.data);
			} else {
				alert('Error in registering user');
			}
		});
	};
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					Request ID: {props.requestID}
				</Typography>
				<Typography variant="h5" component="h2">
					Name: {props.name}
				</Typography>
				<Typography variant="h5" component="h2">
					Hospital: {props.hospital}
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={handleAcceptClick} size="small">
					Accept
				</Button>

				<Button onClick={handleRejectClick} size="small">
					Reject
				</Button>
			</CardActions>
		</Card>
	);
};
export default RequestCard;
