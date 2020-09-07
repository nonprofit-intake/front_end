import React, { useEffect, useState } from 'react'

import UserDashboard from './user-dashboard/user-dashboard'
import StaffDashboard from './staff-dashboard/staff-dashboard'
import AdminDashboard from './admin-dashboard/admin-dashboard'
import { fetchCurrentUser } from '../../api/fetchCurrentUser'
import { setCurrentUser } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Dashboards = () => {

    const history = useHistory()

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser)

    const [role, setRole] = useState(null)

    useEffect(() => {
        fetchCurrentUser().then(res => {
            const { user } = res.payload
            dispatch(setCurrentUser(user))
        }).catch(err => {
            history.push('/login')
        })
    }, [])

    switch (currentUser.role) {
        case 'user':
            return <UserDashboard />
        case 'staff':
            return <StaffDashboard />
        case 'admin':
            return <AdminDashboard />
        default:
            return <h1>Loading. . .</h1>
    }
}

export default Dashboards