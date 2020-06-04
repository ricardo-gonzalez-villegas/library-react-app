import React from 'react';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import useInputState from './hooks/useInputState';

const useStyles = makeStyles(theme => ({
	root: {},
	button: {
		marginTop: '2rem',
		padding: '10px 40px',
	},
	input: {
		marginTop: '2rem',
	},
}));

export default function NewBookForm({ addBook }) {
	const classes = useStyles();
	const [title, handleTitle, resetTitle] = useInputState('');
	const [author, handleAuthor, resetAuthor] = useInputState('');
	const [pages, handlePages, resetPages] = useInputState('');
	const [read, handleRead, resetRead] = useInputState('');

	return (
		<>
			<Typography variant='h5'>New Book Form</Typography>
			<form
				className={classes.root}
				onSubmit={e => {
					e.preventDefault();
					addBook(title, author, pages, read);
					resetAuthor();
					resetTitle();
					resetPages();
					resetRead();
				}}
			>
				<FormControl
					variant='filled'
					fullWidth
					className={classes.input}
				>
					<InputLabel htmlFor='title-input'>Title</InputLabel>
					<FilledInput
						autoFocus={true}
						id='title-input'
						value={title}
						onChange={handleTitle}
						required
					/>
				</FormControl>
				<FormControl
					variant='filled'
					fullWidth
					className={classes.input}
				>
					<InputLabel htmlFor='author-input'>Author</InputLabel>
					<FilledInput
						id='author-input'
						value={author}
						onChange={handleAuthor}
						required
					/>
				</FormControl>
				<FormControl
					variant='filled'
					fullWidth
					className={classes.input}
				>
					<InputLabel htmlFor='pages-input'>Pages</InputLabel>
					<FilledInput
						id='pages-input'
						value={pages}
						onChange={handlePages}
						required
					/>
				</FormControl>
				<FormControl
					variant='filled'
					className={classes.input}
					fullWidth
				>
					<InputLabel htmlFor='read-select'>Read / Unread</InputLabel>
					<Select
						id='read-select'
						value={read}
						onChange={handleRead}
						required
					>
						<MenuItem value={true}>Read</MenuItem>
						<MenuItem value={false}>Unread</MenuItem>
					</Select>
				</FormControl>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					className={classes.button}
				>
					Add Book
				</Button>
			</form>
		</>
	);
}
