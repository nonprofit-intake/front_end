import React from 'react';

import UserDashboard from './user-dashboard/user-dashboard';
import StaffDashboard from './staff-dashboard/staff-dashboard';
import AdminDashboard from './admin-dashboard/admin-dashboard';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner';
import ProgressBar from '../../components/progress-bar/progress-bar';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const Dashboards = () => {
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

	if (!currentUser.isAuthorized) {
		return (
			<div className="container">
				<h1>Please contact an admin to become authorized</h1>
			</div>
		);
	}

	switch (currentUser.role) {
		case 'guest':
			return <UserDashboard></UserDashboard>;
		case 'admin':
			return <Redirect to="/apps" />;
		case 'staff':
			return <Redirect to="/apps" />;
	}
};

export default Dashboards;
