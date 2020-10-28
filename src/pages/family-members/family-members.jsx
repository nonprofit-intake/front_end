import React, { useEffect, useState } from 'react';
import { tableIcons } from '../../utils/material-table-icons'
import ProgressBar from '../../components/progress-bar/progress-bar'
import Skeleton from '@material-ui/lab/Skeleton'
import { addMember } from '../../api/addMember'
import MaterialTable, { MTableToolbar } from 'material-table';

import { axiosWithAuth } from '../../utils/auth/axiosWithAuth'
import { useHistory, useParams } from 'react-router-dom';
import Chip from '@material-ui/core/Chip'
import InfoIcon from '@material-ui/icons/Info';

import './family-members.scss'

export default function MaterialTableDemo() {
    const history = useHistory()
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [state, setState] = React.useState({
        columns: [
            { title: 'Relationship', field: 'relationship_to_HoH' },
            { title: 'First Name', field: 'first_name', type: "hidden" },
            { title: 'Last Name', field: 'last_name' },
            { title: 'Birth Date', field: 'dob', type: 'date' },
            { title: 'Email', field: 'email' },
            { title: 'SSN', field: 'ssn' },
            { title: 'Exit Destination', field: 'exit_destination' },
            { title: 'Race', field: 'race' },
            { title: 'Ethnicity', field: 'ethnicity' },
            { title: 'Gender', field: 'gender' },
            { title: 'Project Name', field: 'project_name' },
            { title: 'Enroll Date', field: 'enroll_date', type: "date" },
            { title: 'Exit Date', field: 'exit_date', type: 'date' },
            { title: 'Pregnancy Due Date', field: 'pregnancy_due_date', type: 'date' },
            { title: 'When DV Occured', field: 'when_dv_occured', type: 'date' },
            { title: 'Income at entry', field: 'income_at_entry', type: "currency" },
            { title: 'Income at exit', field: 'income_at_exit', type: "currency" },
            { title: 'Domestic Violence', field: 'domestic_violence', type: "boolean" },
            { title: 'Currently Fleeing', field: 'currently_fleeing', type: "boolean" },
            { title: 'in school', field: 'is_school', type: "boolean" },
            { title: 'Connected to MVento', field: 'connected_to_MVento', type: "boolean" }
        ],
        data: [],
    });

    const handleRedirect = () => {
        history.push(`/guests/family/add/${params.fam_id}`)
    }

    useEffect(() => {
        setLoading(true)
        axiosWithAuth().get(`/api/guests/family/${params.fam_id}`).then(res => {
            const { members } = res.data.payload
            setState({
                ...state,
                data: members
            })
            setLoading(false)


        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div>
                <div className="container-skeleton">
                    <Skeleton height={400} />
                </div>
                <ProgressBar />
            </div>
        )
    }

    return (
        <div className='container'>
            <MaterialTable
                icons={tableIcons}
                title={`Dependents of ${state.data[0]?.first_name || ''} ${state.data[0]?.last_name || ''}`}
                columns={state.columns}
                data={state.data}
                actions={[
                    {
                        icon: InfoIcon,
                        tooltip: 'More Info',
                        onClick: (event, rowData) => {
                            // Do save operation
                            history.push(`/guests/${rowData.personal_id}`)
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
                            axiosWithAuth().patch(`/api/guests/family/${oldData.fam_id}/${oldData.personal_id}`, newMemberData).then(res => {
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
                            console.log(member.personal_id)
                            axiosWithAuth().delete(`/api/guests/family/${member.fam_id}/${member.personal_id}`).then(res => {
                                resolve()
                                setState((prevState) => {
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
            {loading && <ProgressBar />}
        </div>

    );
}