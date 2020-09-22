import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

import { forwardRef } from 'react';

import { axiosWithAuth } from '../../utils/auth/axiosWithAuth'
import jwt_decode from 'jwt-decode'
import ProgressBar from '../../components/progress-bar/progress-bar'
import Skeleton from '@material-ui/lab/Skeleton'
import { useHistory } from 'react-router-dom';
import NoteIcon from '@material-ui/icons/Note';
import PeopleIcon from '@material-ui/icons/People';
import { tableIcons } from '../../utils/material-table-icons'

export default function MaterialTableDemo() {
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const [state, setState] = React.useState({
        columns: [
            { title: 'First Name', field: 'first_name', type: "hidden" },
            { title: 'Last Name', field: 'last_name' },
            { title: 'Birth Date', field: 'dob', type: 'date' },
            { title: 'Email', field: 'email' },
            { title: 'SSN', field: 'ssn' },
        ],
        data: [],
    });

    useEffect(() => {
        const { user_id: id } = jwt_decode(localStorage.getItem('token'))
        setLoading(true)
        axiosWithAuth().get(`/api/guests`).then(res => {
            const { guests } = res.data.payload
            setState({
                ...state,
                data: guests
            })
            setLoading(false)

        }).catch(err => {
            setLoading(false)
            alert(err.message)
            // history.push('/error-page')
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
                title="Guests"
                columns={state.columns}
                data={state.data}
                actions={[
                    {
                        icon: PeopleIcon,
                        tooltip: 'Family',
                        onClick: (event, rowData) => {
                            // Do save operation
                            history.push(`/guests/family/${rowData.fam_id}`)
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