import React, { useEffect, useState } from 'react'
import { fetchAllUsers } from '../../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import UserList from '../../../components/user-list/user-list'


const AdminDashboard = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(fetchAllUsers())
    },[])

    return (
        <div className='admin-dashboard-container'>
            <UserList users={users}></UserList>
        </div>
    )
}

export default AdminDashboard