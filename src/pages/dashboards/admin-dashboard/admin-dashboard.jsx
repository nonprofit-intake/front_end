import React from 'react'

import './admin-dashboard.scss'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const AdminDashboard = () => {
    const history = useHistory()

    const handleClick = () => {
        history.push('/register-family')
    }

    return (
        <div className='admin-dashboard'>
            <h1>Admin dashboard</h1>
            <Button color='primary' onClick={handleClick}>Register Family</Button>
        </div>
    )
}

export default AdminDashboard