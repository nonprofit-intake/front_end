import React, { useEffect, useState } from 'react'
import { fetchAllUsers } from '../../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import UserList from '../../../components/user-list/user-list'
import ProgressBar from '../../../components/progress-bar/progress-bar'

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const isLoading = useSelector(state => state.isLoading)

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [])

    return (
        <div className='admin-dashboard-container'>
            <UserList users={users}></UserList>
            {isLoading && <ProgressBar />}
        </div>
    )
}

export default AdminDashboard