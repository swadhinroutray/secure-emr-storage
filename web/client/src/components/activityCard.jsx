import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { get, post } from '../utils/api';

const Styles = makeStyles({
	root: {
		maxWidth: '80vh',
		marginTop: '2vh',
		marginBottom: '0.2vh',
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

const ActivityCard = (props) => {
	const classes = Styles();
	// const bull = <span className={classes.bullet}>•</span>;

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					Timestamp: {props.timestamp}
				</Typography>
				<Typography variant="h6" component="h2">
					Name: {props.name}
				</Typography>
				<Typography wrap variant="h6" component="h2">
					Activity: {props.activity}
				</Typography>
			</CardContent>
		</Card>
	);
};
export default ActivityCard;
