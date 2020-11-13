import React, { useState, useEffect } from 'react';

import './dashboard.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { DataGrid } from '@material-ui/data-grid';
import MaterialTable from 'material-table';
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth';
import ProgressBar from '../../components/progress-bar/progress-bar';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router-dom';
import NoteIcon from '@material-ui/icons/Note';
import PeopleIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';
import { tableIcons } from '../../utils/material-table-icons';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
		minHeight: 200
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
		fontSize: 24
	},
	pos: {
		marginBottom: 12
	}
});

const columns = [
	{ title: 'name', field: 'first_name' },
	{ title: 'surname', field: 'last_name' },
	{ title: 'email', field: 'email' },
	{ title: '', field: 'isClockedIn', type: 'boolean' }
];
const rows = [
	{ name: 'Snow', surname: 'Jon', age: 35 },
	{ name: 'Lannister', surname: 'Cersei', age: 42 },
	{ name: 'Lannister', surname: 'Jaime', age: 45 },
	{ name: 'Stark', surname: 'Arya', age: 16 },
	{ name: 'Targaryen', surname: 'Daenerys', age: null },
	{ name: 'Melisandre', surname: null, age: 150 },
	{ name: 'Clifford', surname: 'Ferrara', age: 44 },
	{ name: 'Frances', surname: 'Rossini', age: 36 },
	{ name: 'Roxie', surname: 'Harvey', age: 65 }
];

const Dashboard = () => {
	const [ staffMembers, setStaffMembers ] = useState([]);
	const classes = useStyles();
	const history = useHistory();
	useEffect(() => {
		axiosWithAuth()
			.get('/api/users')
			.then((res) => {
				setStaffMembers(res.data.payload.users);
			})
			.catch((err) => {
				console.log(err);
				alert(err);
			});
	}, []);

	return (
		<div className="dashboard-container">
			<FiberManualRecordIcon style={{ color: 'red' }} />
			<div className="cards-container">
				<div className="cards">
					<Card className={classes.root} variant="outlined">
						<CardContent>
							<Typography className={classes.title} color="textPrimary" gutterBottom>
								Clocked in
							</Typography>
							<Typography className={classes.body} color="textPrimary" gutterBottom>
								Clocked in
							</Typography>
						</CardContent>
					</Card>
					<Card className={classes.root} variant="outlined">
						<CardContent>
							<Typography className={classes.title} color="textPrimary" gutterBottom>
								Staying the night
							</Typography>
						</CardContent>
					</Card>
					<Card className={classes.root} variant="outlined">
						<CardContent>
							<Typography className={classes.title} color="textPrimary" gutterBottom>
								Guest total
							</Typography>
						</CardContent>
					</Card>
				</div>

				<div className="second">
					<div style={{ height: 400, width: '100%' }}>
						<MaterialTable
							icons={tableIcons}
							title="Staff"
							columns={columns}
							data={staffMembers}
							actions={[]}
							editable={{
								// onRowRedirect: (newData) =>
								//     new Promise((resolve) => {
								//         setTimeout(() => {
								//             resolve();
								//             setState((prevState) => {
								//                 const data = [...prevState.data];
								//                 data.push(newData);
								//                 return { ...prevState, data };
								//             });
								//         }, 600);
								//     }),
							}}
						/>
					</div>
					<div />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
