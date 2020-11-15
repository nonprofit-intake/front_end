import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { declineUser, acceptUser } from '../../redux/actions/staffActions';
import ProgressBar from '../../components/progress-bar/progress-bar';
import './pending.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		maxWidth: 752
	},
	demo: {
		backgroundColor: theme.palette.background.paper
	},
	title: {
		margin: theme.spacing(4, 0, 2)
	}
}));

// updatedUsers.map((user, idx) => {
//     if (user.user_id === id) {
//         updatedUsers.splice(idx, 1)
//     }
// })

const Pending = () => {
	const history = useHistory();
	const unAuthorizedUsers = useSelector((state) => state.unAuthorizedUsers);

	const isLoading = useSelector((state) => state.isLoading);
	const classes = useStyles();
	const [ users, setUsers ] = useState([]);
	const dispatch = useDispatch();

	const verifyStaffMember = (id, history) => {
		dispatch(acceptUser(id, history));
	};

	const declineStaffMember = (id, history) => {
        alert(id)
		dispatch(declineUser(id, history));
	};

	if (unAuthorizedUsers.length === 0) {
		return (
			<div className="container">
				<h1>You do not have any pending staff members</h1>
			</div>
		);
	}

	return (
		<div>
			{isLoading && <ProgressBar />}
			<div className="list-container">
				<div className={classes.demo}>
					<List>
						{unAuthorizedUsers.map((user) => {
							return (
								<ListItem key={user.id}>
									<ListItemAvatar>
										<Avatar>
											<PersonIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={`${user.first_name} ${user.last_name}  (${user.email})`} />
									<ListItemSecondaryAction>
										<IconButton
											edge="end"
											aria-label="delete"
											onClick={() => verifyStaffMember(user.id, history)}
										>
											<CheckCircleIcon />
										</IconButton>
										<IconButton
											edge="end"
											aria-label="Yup"
											onClick={() => declineStaffMember(user.id, history)}
										>
											<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							);
						})}
					</List>
				</div>
			</div>
		</div>
	);
};

export default Pending;
