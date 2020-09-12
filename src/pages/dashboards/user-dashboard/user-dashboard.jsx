import React, { useEffect } from 'react';
import MaterialTable from 'material-table';

import './user-dashboard.scss'

import { forwardRef } from 'react';

import { axiosWithAuth } from '../../../utils/auth/axiosWithAuth'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import jwt_decode from 'jwt-decode'


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};




export default function MaterialTableDemo() {
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

        axiosWithAuth().get(`/api/users/${id}/family/members`).then(res => {
            const { members } = res.data.payload
            setState({
                ...state,
                data: members
            })


        }).catch(err => {
            console.log(err)
        })
    }, [])



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

        </div>

    );
}