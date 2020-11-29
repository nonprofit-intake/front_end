import React, { useEffect } from 'react';
import './admin-dashboard.scss';
import {setUnauthorizedUsers} from '../../../redux/actions/staffActions'
import {useDispatch} from 'react-redux'

const AdminDashboard = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setUnauthorizedUsers())
	},[])

	return (
		<div className="admin-dashboard">
			<h1>Admin dashboard</h1>
		</div>
	);
};

export default AdminDashboard;
