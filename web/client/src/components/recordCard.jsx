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
		minWidth: '70vh',
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

const RecordCard = (props) => {
	const classes = Styles();
	// const history = useHistory();
	// const bull = <span className={classes.bullet}>•</span>;
	const handleClick = () => {};
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					Record ID: {props.recordID}
				</Typography>
				<Typography variant="h5" component="h2">
					Record Name: {props.recordName}
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={handleClick} size="small">
					Download
				</Button>
			</CardActions>
		</Card>
	);
};
export default RecordCard;
