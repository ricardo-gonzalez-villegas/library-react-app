import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
	root: {
		width: '25%',
	},
	header: {
		fontSize: '20px',
	},
	delete: {
		marginLeft: 'auto',
	},
}));

export default function Book(props) {
	const classes = useStyles();
	const { id, author, title, pages, read, toggleRead, deleteBook } = props;
	return (
		<Card className={classes.root} variant='outlined'>
			<CardHeader
				className={classes.header}
				avatar={
					<Avatar
						aria-label='read-status'
						className={classes.avatar}
						style={{
							backgroundColor: read ? 'navy' : 'lightblue',
						}}
					>
						{read ? 'R' : 'UR'}
					</Avatar>
				}
			/>
			<CardContent>
				<Typography variant='h5' color='textPrimary'>
					{title}
				</Typography>
				<Typography
					variant='subtitle1'
					color='textSecondary'
					component='p'
				>
					{author} - {pages} Pgs
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton
					aria-label='change-read-status'
					onClick={() => toggleRead(id)}
				>
					{read ? <VisibilityIcon /> : <VisibilityOffIcon />}
				</IconButton>
				<IconButton
					aria-label='delete-book'
					className={classes.delete}
					onClick={() => deleteBook(id)}
				>
					<DeleteIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}
