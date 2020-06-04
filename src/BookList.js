import React from 'react';
import Book from './Book.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
}));

export default function BookList({ books, toggleRead, deleteBook }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{books.map(book => (
				<Book
					deleteBook={deleteBook}
					toggleRead={toggleRead}
					key={book.id}
					id={book.id}
					title={book.title}
					author={book.author}
					pages={book.pages}
					read={book.read}
				/>
			))}
		</div>
	);
}
