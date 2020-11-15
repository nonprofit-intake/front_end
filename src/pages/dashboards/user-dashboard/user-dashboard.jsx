import React, { useEffect, useState } from 'react';
import Circle from 'react-circle';
import './user-dashboard.scss';
import Button from '@material-ui/core/Button';
import { axiosWithAuth } from '../../../utils/auth/axiosWithAuth';
import { setCurrentUser } from '../../../redux/actions/actions';
import { useSelector } from 'react-redux';

export default function UserDashboard() {
	const currentUser = useSelector((state) => state.currentUser);
	const handleClockIn = () => {
		axiosWithAuth()
			.get('/api/users/me')
			.then((res) => {
				return axiosWithAuth().patch('/api/users/me', { clocked_in: !res.data.payload.user.clocked_in });
			})
			.catch((err) => {
				alert('unable to clock in, please try again later');
			});
	};

	return (
		<div className="circle-container">
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<h2>Carrying Capacity</h2>
				<Circle size="400" />
				<Button size="large" color="primary" onClick={handleClockIn}>
					Clock in
				</Button>
			</div>
		</div>
	);
}
