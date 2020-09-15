import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'


const StaffDashboard = () => {
    const history = useHistory()
    return (
        <form>
            <h1>Staff Dashboard</h1>
            <Button color='primary' onClick={() => history.push('/register-family')}>Register family</Button>
        </form>
    )
}

export default StaffDashboard