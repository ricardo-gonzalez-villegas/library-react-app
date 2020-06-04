import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NewBookForm from './NewBookForm';
import BookList from './BookList';
import { v4 as uuid } from 'uuid';
import useLocalStorageState from './hooks/useLocalStorageState';

const drawerWidth = 380;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	container: {
		width: '90%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
	},
}));

const initialBooks = [
	{
		id: 1,
		title: `Harry Potter and the Philosopher's Stone`,
		author: 'J. K. Rowling',
		pages: 336,
		read: true,
	},
	{
		id: 2,
		title: 'Harry Potter and the Chamber of Secrets',
		author: 'J. K. Rowling',
		pages: 341,
		read: true,
	},
	{
		id: 3,
		title: 'Harry Potter and the Prisoner of Azkaban',
		author: 'J. K. Rowling',
		pages: 435,
		read: true,
	},
	{
		id: 4,
		title: 'Harry Potter and the Goblet of Fire',
		author: 'J. K. Rowling',
		pages: 734,
		read: true,
	},
	{
		id: 5,
		title: 'Harry Potter and the Order of the Phoenix',
		author: 'J. K. Rowling',
		pages: 870,
		read: false,
	},
	{
		id: 6,
		title: 'Harry Potter and the Half-Blood Prince',
		author: 'J. K. Rowling',
		pages: 652,
		read: false,
	},
	{
		id: 7,
		title: 'Harry Potter and the Deathly Hallows',
		author: 'J. K. Rowling',
		pages: 759,
		read: false,
	},
];

export default function Library() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const [books, setBooks] = useLocalStorageState('books', initialBooks);

	const addBook = (title, author, pages, read) => {
		setBooks([...books, { id: uuid(), title, author, pages, read }]);
	};

	const toggleRead = id => {
		const updatedBooks = books.map(book =>
			book.id === id ? { ...book, read: !book.read } : book
		);
		setBooks(updatedBooks);
	};

	const deleteBook = id => {
		const updatedBooks = books.filter(book => book.id !== id);
		setBooks(updatedBooks);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(
							classes.menuButton,
							open && classes.hide
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h3' noWrap>
						Library React App
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				open={open}
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<div className={classes.container}>
					{open && <NewBookForm addBook={addBook} />}
				</div>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				<BookList
					books={books}
					toggleRead={toggleRead}
					deleteBook={deleteBook}
				/>
			</main>
		</div>
	);
}
