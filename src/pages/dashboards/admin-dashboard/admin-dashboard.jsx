import React, { useEffect, useState } from 'react'
import { fetchAllUsers } from '../../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import UserList from '../../../components/user-list/user-list'
import ProgressBar from '../../../components/progress-bar/progress-bar'
import './admin-dashboard.scss'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'


const AdminDashboard = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const isLoading = useSelector(state => state.isLoading)

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