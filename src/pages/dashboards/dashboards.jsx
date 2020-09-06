import React, { useEffect, useState } from 'react'

import UserDashboard from './user-dashboard/user-dashboard'
import StaffDashboard from './staff-dashboard/staff-dashboard'
import AdminDashboard from './admin-dashboard/admin-dashboard'



const Dashboards = () => {

    const [role, setRole] = useState(null)

    useEffect(() => {
        // *** GET /api/users/me ***

        // Set the role into state

    }, [])

    switch (role) {
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