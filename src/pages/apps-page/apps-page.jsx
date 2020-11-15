import React, { useEffect } from 'react';
import AppCard from './card/Card';

import './apps-page.scss';
import { useHistory } from 'react-router-dom';
import dashboardImg from '../../assets/svg/analyse.png';
import registerFamilyImg from '../../assets/svg/support.png';
import placeHolder from '../../assets/svg/Astronaut.png';
import Sleep from '../../assets/svg/relax-sleep.png';

import { setDashboardData } from '../../redux/actions/actions';
import { setUnauthorizedUsers } from '../../redux/actions/staffActions';
import { useSelector, useDispatch } from 'react-redux';

const AppsPage = () => {
	const currentUser = useSelector((state) => state.currentUser);
	const dispatch = useDispatch();
	useEffect(() => {
		if (currentUser.role == 'admin') {
			dispatch(setDashboardData());
			dispatch(setUnauthorizedUsers());
		}
	}, []);

	const history = useHistory();
	if (!currentUser.isAuthorized) {
		return (
			<div className="container">
				<h1>Please contact an admin to become authorized</h1>
			</div>
		);
	}

	return (
		<div className="apps-container">
			<div className="apps">
				<div onClick={() => history.push('/register-family')}>
					<AppCard title={'Register Family'} img={registerFamilyImg}>
						place
					</AppCard>
				</div>
				{currentUser.role === 'admin' && (
					<div onClick={() => history.push('/dashboard')}>
						<AppCard title={'Dashboard'} img={dashboardImg}>
							place
						</AppCard>
					</div>
				)}
				<div>
					<a href="https://forms.gle/w8sbSp5eHeH3cFF4A" target="_blank">
						<AppCard title={'Report a Bug'} img={placeHolder}>
							place
						</AppCard>
					</a>
				</div>
			</div>
		</div>
	);
};

export default AppsPage;
