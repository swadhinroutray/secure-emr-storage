import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect, useHistory } from 'react-router';
import { Link } from 'react-router-dom';

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

const PatientCard = (props) => {
	const classes = Styles();
	const history = useHistory();
	// const bull = <span className={classes.bullet}>•</span>;
	const handleClick = () => {
		const link = '/' + props.patientID;
		console.log(link);

		history.push(link);
	};
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					Patient ID: {props.patientID}
				</Typography>
				<Typography variant="h5" component="h2">
					Name: {props.name}
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={handleClick} size="small">
					View Records
				</Button>
			</CardActions>
		</Card>
	);
};
export default PatientCard;
