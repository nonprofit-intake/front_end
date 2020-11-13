import React, { useState } from 'react';

import { tableIcons } from '../../../utils/material-table-icons';
import ProgressBar from '../../../components/progress-bar/progress-bar';
import Skeleton from '@material-ui/lab/Skeleton';
import { addMember } from '../../../api/addMember';
import MaterialTable, { MTableToolbar } from 'material-table';
import { axiosWithAuth } from '../../../utils/auth/axiosWithAuth';
import { useHistory, useParams } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import InfoIcon from '@material-ui/icons/Info';

const Table = ({ data, setData, columns }) => {
	const history = useHistory();
	const handleRedirect = () => {};
	const params = useParams();

	return (
		    <MaterialTable
		    icons={tableIcons}
		    title={`Dependents of ${data[0]?.first_name || ''} ${data[0]?.last_name || ''}`}
		    columns={columns}
		    data={data}
		    actions={[
		        {
		            icon: InfoIcon,
		            tooltip: 'More Info',
		            onClick: (event, rowData) => {
		                // Do save operation
		                history.push(`/guests/${rowData.guest_id}`)
		            }
		        },
		    ]}
		    components={
		        {
		            Toolbar: props => (
		                <div>
		                    <MTableToolbar {...props} />
		                    <div style={{ padding: '0px 10px' }} className='chip'>
		                        <Chip onClick={handleRedirect} label="Add New Member" color="primary" style={{ marginRight: 5 , cursor: 'pointer'}} />
		                    </div>
		                </div>
		            )
		        }
		    }

		    editable={{

		        onRowUpdate: (newMemberData, oldData) =>
		            new Promise((resolve) => {
		                axiosWithAuth().patch(`/api/guests/family/${oldData.fam_id}/${oldData.guest_id}`, newMemberData).then(res => {
		                    resolve()
		                    setData((prevState) => {
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
		                axiosWithAuth().delete(`/api/guests/family/${member.fam_id}/${member.guest_id}`).then(res => {
		                    resolve()
		                    setData((prevState) => {
		                        const data = [...prevState.data];
		                        data.splice(data.indexOf(member), 1);
		                        return { ...prevState, data };
		                    });
		                }).catch(err => {
		                    resolve()
		                    console.log(err)
		                    alert("Unable to delete user, please try again")
		                })
		            }),

		    }}
		/>
	);
};

export default Table;
