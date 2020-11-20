import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { logOut } from '../../redux/actions/actions';
import PeopleIcon from '@material-ui/icons/People';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import HouseIcon from '@material-ui/icons/House';
import AppsIcon from '@material-ui/icons/Apps';
import './drawer.scss';
import { Badge, Button } from '@material-ui/core';
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import BarChartIcon from '@material-ui/icons/BarChart';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	btn: {
		color: 'white'
	},
	appBar: {
		display: 'flex',
		justifyContent: 'end',

		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: 36
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

export default function MiniDrawer() {
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();
	const theme = useTheme();
	const [ open, setOpen ] = React.useState(false);
	const currentUser = useSelector((state) => state.currentUser);
	const isLoggedIn = useSelector((state) => state.isLoggedIn);
	const [ checked, setChecked ] = useState(false);
	const handleChange = () => {
		setChecked(!checked);
	};

	const unAuthorizedUsers = useSelector((state) => state.unAuthorizedUsers);

	useEffect(
		() => {
			console.log(currentUser);
		},
		[ checked ]
	);

	const clockIn = () => {
		let toggleChecked = !checked;
		setChecked(!checked);
		axiosWithAuth()
			.patch(`/api/users/${currentUser.id}`, { clocked_in: toggleChecked })
			.then((res) => {
				console.log('worked');
			})
			.catch((err) => {
				alert('unable to clock out');
			});
	};

	const handleLogout = () => {
		dispatch(logOut(history));
		setOpen(false);
	};

	const redirectToApps = () => {
		history.push('/');
	};

	const redirectToPending = () => {
		history.push('/pending');
	};

	const redirectToRegister = () => {
		history.push('/register');
	};

	const redirectToLogin = () => {
		history.push('/login');
	};

	const redirectToGuests = () => {
		history.push('/data-table');
	};

	const handleDrawerOpen = () => {
		setOpen(true);
		console.log(currentUser);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				id="appbar"
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar>
					{[ 'staff', 'admin', 'guest' ].includes(currentUser.role) && (
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, {
								[classes.hide]: open
							})}
						>
							<MenuIcon />
						</IconButton>
					)}
					<div id="icon">
						<Button onClick={redirectToApps} size="large" className={classes.btn}>
							Family Promise
						</Button>
					</div>

					{isLoggedIn ? (
						<div className="guest-actions">
							{currentUser.isAuthorized && (
								<div onClick={clockIn}>
									<Button className={classes.btn}>Clock {checked ? 'out' : 'in'}</Button>
									<Switch
										checked={checked}
										onChange={handleChange}
										name="checked"
										color="secondary"
									/>
								</div>
							)}
						</div>
					) : (
						<div className="guest-actions">
							<Button className={classes.btn} onClick={redirectToLogin}>
								Login
							</Button>
							<Button className={classes.btn} onClick={redirectToRegister}>
								Register
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>

			{isLoggedIn ? (
				<Drawer
					variant="permanent"
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open
						})
					}}
				>
					<div className={classes.toolbar}>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
						</IconButton>
					</div>
					<Divider />
					<List>
						{/* {['View Profile', 'Logout'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))} */}

						<ListItem button onClick={handleLogout}>
							<ListItemIcon>
								<ExitToAppIcon />
							</ListItemIcon>
							<ListItemText primary={'Logout'} />
						</ListItem>
					</List>
					<Divider />

					{[ 'admin' ].includes(currentUser.role) && (
						<ListItem button onClick={() => history.push('/admin')}>
							<ListItemIcon>
								<BarChartIcon />
							</ListItemIcon>
							<ListItemText primary={'Analytics'} />
						</ListItem>
					)}

					{[ 'staff', 'admin' ].includes(currentUser.role) ? (
						<List>
							<ListItem button onClick={() => history.push('/register-family')}>
								<ListItemIcon>
									<ImportContactsIcon />
								</ListItemIcon>
								<ListItemText primary={'Register Family'} />
							</ListItem>
							<ListItem button onClick={redirectToGuests}>
								<ListItemIcon>
									<PeopleIcon />
								</ListItemIcon>
								<ListItemText primary={'Guests'} />
							</ListItem>
						</List>
					) : (
						''
					)}

					{[ 'admin' ].includes(currentUser.role) && (
						<div>
							<ListItem button onClick={redirectToPending}>
								<ListItemIcon>
									{unAuthorizedUsers.length > 0 ? (
										<Badge badgeContent={unAuthorizedUsers.length} color="secondary">
											<MailIcon color="primary" />
										</Badge>
									) : (
										<MailIcon color={unAuthorizedUsers.length > 0 ? 'primary' : ''} />
									)}
								</ListItemIcon>
								<ListItemText primary={'Pending'} />
							</ListItem>
						</div>
					)}
				</Drawer>
			) : (
				''
			)}
		</div>
	);
}
