import React from 'react';

import UserDashboard from './user-dashboard/user-dashboard';
import AdminDashboard from './admin-dashboard/admin-dashboard';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner';
import ProgressBar from '../../components/progress-bar/progress-bar';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const CrossRoad = () => {
	const history = useHistory();
	const currentUser = useSelector((state) => state.currentUser);
	const isLoading = useSelector((state) => state.isLoading);

	if (isLoading) {
		return (
			<div>
				<Spinner />
				<ProgressBar />
			</div>
		);
	}

	switch (currentUser.role) {
		case 'guest':
			return <Redirect to="/guest" />;
		case 'admin':
			return <Redirect to="/admin" />;
		case 'staff':
			return <Redirect to="/data-table" />;
		default:
			return (
				<div style={{width: '100%', textAlign: 'center', marginTop: '8rem'}}>
					<h1>Please contact an admin to become authorized</h1>
				</div>
			);
	}
};

export default CrossRoad;
