import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { tableIcons } from '../../utils/material-table-icons'
import ProgressBar from '../../components/progress-bar/progress-bar'
import Skeleton from '@material-ui/lab/Skeleton'

import { addMember } from '../../api/addMember'

import { axiosWithAuth } from '../../utils/auth/axiosWithAuth'
import { useParams } from 'react-router-dom';

export default function MaterialTableDemo() {
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
        ],
        data: [],
    });


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
                    // {
                    //     icon: 'test',
                    //     tooltip: 'Family',
                    //     onClick: (data, member) => {
                    //         new Promise((resolve) => {
                    //             // resolve()
                    //             console.log(member)
                    //             addMember(params.fam_id, member).then(res => {
                    //                 resolve()

                    //                 setState((prevState) => {
                    //                     const data = [...prevState.data];
                    //                     member.personal_id = res.payload.member.personal_id
                    //                     console.log(member)
                    //                     data.push(member);
                    //                     return { ...prevState, data };
                    //                 });
                    //             }).catch(err => {
                    //                 alert('Unable to add user')
                    //                 resolve()
                    //             })
                    //         })
                    //     }
                    // },
                ]}
                editable={{
                    onRowAdd: (member) =>
                        new Promise((resolve) => {
                            // resolve()
                            console.log(member)
                            addMember(params.fam_id, member).then(res => {
                                resolve()

                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    member.personal_id = res.payload.member.personal_id
                                    console.log(member)
                                    data.push(member);
                                    return { ...prevState, data };
                                });
                            }).catch(err => {
                                alert('Unable to add user')
                                resolve()
                            })
                        }),
                    onRowUpdate: (newMemberData, oldData) =>
                        new Promise((resolve) => {
                            console.log(newMemberData)
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