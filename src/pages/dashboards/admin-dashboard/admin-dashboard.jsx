import React, { useEffect } from 'react'

import './admin-dashboard.scss'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { setUnauthorizedUsers } from '../../../redux/actions/staffActions'
import { useDispatch } from 'react-redux'

const AdminDashboard = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleClick = () => {
        history.push('/register-family')
    }

    useEffect(() => {
        dispatch(setUnauthorizedUsers())
    }, [])

    return (
        <div className='admin-dashboard'>
            <h1>Admin dashboard</h1>
            <Button color='primary' onClick={handleClick}>Register Family</Button>
        </div>
    )
}

export default AdminDashboard