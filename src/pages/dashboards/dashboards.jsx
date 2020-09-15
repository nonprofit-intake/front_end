import React, { useEffect, useState } from 'react'

import UserDashboard from './user-dashboard/user-dashboard'
import StaffDashboard from './staff-dashboard/staff-dashboard'
import AdminDashboard from './admin-dashboard/admin-dashboard'
import { fetchCurrentUser } from '../../api/fetchCurrentUser'
import { setCurrentUser } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Spinner from '../../components/spinner/spinner'
import ProgressBar from '../../components/progress-bar/progress-bar'

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

        })
    }, [])

    switch (currentUser.role) {
        case 'guest':
            return <UserDashboard />
        case 'staff':
            return <StaffDashboard />
        case 'admin':
            return <AdminDashboard />
        default:
            return (
                <div>
                    <Spinner />
                    <ProgressBar />
                </div>
            )
    }
}

export default Dashboards