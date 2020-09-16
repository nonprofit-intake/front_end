import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

import './user-dashboard.scss'

import { forwardRef } from 'react';

import { axiosWithAuth } from '../../../utils/auth/axiosWithAuth'
import jwt_decode from 'jwt-decode'
import ProgressBar from '../../../components/progress-bar/progress-bar'
import Skeleton from '@material-ui/lab/Skeleton'
import { useHistory } from 'react-router-dom';

import { tableIcons } from '../../../utils/material-table-icons'

export default function MaterialTableDemo() {
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const [state, setState] = React.useState({
        columns: [
            { title: 'First Name', field: 'first_name', type: "hidden" },
            { title: 'Last Name', field: 'last_name' },

            { title: 'Birth Date', field: 'dob', type: 'date' },
            { title: 'Email', field: '' },

        ],
        data: [],
    });

    useEffect(() => {
        const { user_id: id } = jwt_decode(localStorage.getItem('token'))
        setLoading(true)
        axiosWithAuth().get(`/api/users/${id}/family/members`).then(res => {
            const { members } = res.data.payload
            setState({
                ...state,
                data: members
            })
            setLoading(false)

        }).catch(err => {
            setLoading(false)
            history.push('/error-page')
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
                title="Dependents"
                columns={state.columns}
                data={state.data}
                editable={{
                    // onRowAdd: (newData) =>
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
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }, 600);
                        }),
                    // onRowDelete: (oldData) =>
                    //     new Promise((resolve) => {
                    //         setTimeout(() => {
                    //             resolve();
                    //             setState((prevState) => {
                    //                 const data = [...prevState.data];
                    //                 data.splice(data.indexOf(oldData), 1);
                    //                 return { ...prevState, data };
                    //             });
                    //         }, 600);
                    //     }),
                }}
            />
            {loading && <ProgressBar />}
        </div>

    );
}