import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

import { axiosWithAuth } from '../../utils/auth/axiosWithAuth';
import ProgressBar from '../../components/progress-bar/progress-bar';
import Skeleton from '@material-ui/lab/Skeleton';
import { useHistory } from 'react-router-dom';
import NoteIcon from '@material-ui/icons/Note';
import PeopleIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';
import { tableIcons } from '../../utils/material-table-icons';
import './guests.scss';

export default function MaterialTableDemo() {
	const [ loading, setLoading ] = useState(true);
	const history = useHistory();

	const [state, setState] = React.useState({
        columns: [
            { title: 'Relationship', field: 'relationship_to_HoH'},
            { title: 'First', field: 'first_name', type: "hidden" },
            { title: 'Last ', field: 'last_name' },
            { title: 'DOB', field: 'dob', type: 'date' },
            { title: '4-SSN', field: 'last_4_digits_of_ssn' },
            { title: 'Race', field: 'race' },
            { title: 'Ethnicity', field: 'ethnicity' },
            { title: 'Gender', field: 'gender' },
            { title: 'in school', field: 'in_school' },
            { title: 'connected to MVento', field: 'connected_to_MVento' },
            { title: 'last grade completed', field: 'last_grade_completed' },
            { title: 'School Status', field: 'school_status' },
            { title: 'alcohol abuse', field: 'alcohol_abuse' },
            { title: 'chronic health', field: 'chronic_health_condition' },
            { title: 'developmental disability', field: 'developmental_disability' },
            { title: 'substance abuse', field: 'substance_abuse' },
            { title: 'HIV/AIDS', field: 'HIV_AIDS' },
            { title: 'mental illness', field: 'mental_health_problem' },
            { title: 'Physical Disability', field: 'physical_disability' },
            { title: 'is pregnant', field: 'is_pregnant' },
            { title: 'Pregnancy Due Date', field: 'pregnancy_due_date', type: 'date' },
        ],
        data: [],
    });

	useEffect(() => {
		setLoading(true);
		axiosWithAuth()
			.get(`/api/v1/guests`)
			.then((res) => {
				const { guests } = res.data.payload;
				setState({
					...state,
					data: guests
				})
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				alert(err.message);
				// history.push('/error-page')
			});
	}, []);

	if (loading) {
		return (
			<div>
				<div className="container-skeleton">
					<Skeleton height={400} />
				</div>
				<ProgressBar />
			</div>
		);
	}

	return (
		<div className="outer-container">
			<div className="table-container">
				<MaterialTable
					icons={tableIcons}
					title="Guests"
					columns={state.columns}
					data={state.data}
					actions={[
						{
							icon: PeopleIcon,
							tooltip: 'Family Members',
							onClick: (event, rowData) => {
								// Do save operation
								history.push(`/family/${rowData.fam_id}/members`);
							}
						},
						{
							icon: NoteIcon,
							tooltip: 'Notes',
							onClick: (event, rowData) => {
								// Do save operation
							}
						}
					]}
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
						onRowUpdate: (newMemberData, oldData) =>
						new Promise((resolve) => {
							axiosWithAuth().patch(`/api/v1/guests/${oldData.id}`, newMemberData).then(res => {
								resolve()
								setState((prevState) => {
									const data = [...prevState.data];
									data[data.indexOf(oldData)] = newMemberData;
									return { ...prevState, data };
								});
							}).catch(err => {
								resolve()
								alert("Unable to update user, please try again")
							})
						}),
						onRowDelete: (member) =>
						new Promise((resolve) => {
							axiosWithAuth().delete(`/api/v1/guests/${member.id}`).then(res => {
								resolve()
								setState((prevState) => {
									const data = [...prevState.data];
									data.splice(data.indexOf(member), 1);
									return { ...prevState, data };
								});
							}).catch(err => {
								resolve()
								alert("Unable to delete user, please try again")
							})
						}),
					}}
				/>
				{loading && <ProgressBar />}
			</div>
		</div>
	);
}
