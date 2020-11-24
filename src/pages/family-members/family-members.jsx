import React, { useEffect, useState, suspens } from 'react';
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
import { Button } from '@material-ui/core';

export default function MaterialTableDemo() {
    const history = useHistory()
    const params = useParams()
    const [loading, setLoading] = useState(true)
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

    const handleRedirect = () => {
        history.push(`/guests/family/add/${params.fam_id}`)
    }


    const fetchFamilyMembers = async () => {
        setLoading(true)
        try {            
            let res = await axiosWithAuth().get(`/api/v1/families/${params.id}/members`)
            const { members } = res.data.payload
  
             setState({
                ...state,
                data: members
            })
        } catch (error) {
            alert('error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
       fetchFamilyMembers()
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
        <div className='outer-container'>
            <div className='table-container'>
                
                    <MaterialTable
                        icons={tableIcons}
                        title={`Dependents of ${state.data[0]?.first_name || ''} ${state.data[0]?.last_name || ''}`}
                        columns={state.columns}
                        data={state.data}
                
                        // components={
                        //     {
                        //         Toolbar: props => (
                        //             <div>
                        //                 <MTableToolbar {...props} />
                        //                 <div style={{ padding: '0px 10px' }} className='chip'>
                        //                     <Chip onClick={handleRedirect} label="Add New Member" color="primary" style={{ marginRight: 5 , cursor: 'pointer'}} />
                        //                 </div>
                        //             </div>
                        //         )
                        //     }
                        // }

                        editable={{
                            onRowAdd: (member) =>
                            new Promise((resolve) => {
                                    axiosWithAuth()
                                        .post(`/api/v1/families/${params.id}/members`, member).then(res => {
                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            member.id = res.data.payload.member.id
                                            data.push(member);
                                            return { ...prevState, data };
                                        });

                                    }).catch(err => {
                                        alert("Unable to add member, please try again")
                                    }).finally(() => {
                                        resolve()
                                    })
                            }),

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
            </div>
        </div>

    );
}