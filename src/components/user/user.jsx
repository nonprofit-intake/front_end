import React from 'react'
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core'
import './user.scss'
import { useHistory } from 'react-router-dom'
import { deleteUser } from '../../redux/actions'
import { useDispatch } from 'react-redux'

const User = ({ name, role, username, id }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleRedirect = (id) => {
        history.push(`/edit-user/${id}`)
    }
    const handleDelete = (id) => {
        dispatch(deleteUser(id))
    }
    return (
        <Paper elevation={1} id='paper'>
            <span>{name}</span>
            <span>{username}</span>
            <span>{role}</span>
            <div className='buttons'>
                <Button color='primary' onClick={() => handleRedirect(id)}>Edit</Button>
                <Button color='secondary' onClick={() => handleDelete(id)}>Delete</Button>
            </div>
        </Paper>
    )
}

export default User