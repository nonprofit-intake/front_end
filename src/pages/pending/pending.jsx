import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import './pending.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));



const Pending = () => {
    const classes = useStyles()
    const [users, setUsers] = useState([])

    const verifyStaffMember = (id) => {
        axiosWithAuth().patch(`/api/users/${id}`, {isAuthorized: true}).then(res => {
            alert('User has been verified')
            const updatedUsers = [...users]

            updatedUsers.map((user, idx) => {
                if (user.user_id === id) {
                    updatedUsers.splice(idx, 1)
                }
            })
            setUsers(updatedUsers)
        }).catch(err => {
            alert('Could not authorize member')
        })
    }

    const declineStaffMember = (id) => {

        axiosWithAuth().delete(`/api/users/${id}`).then(() => {
            const updatedUsers = [...users]

            updatedUsers.map((user, idx) => {
                if (user.user_id === id) {
                    updatedUsers.splice(idx, 1)
                }
            })
            setUsers(updatedUsers)
        }).catch((err) => {
            alert("Unable to delete user")
        })
    }
    useEffect(() => {
        axiosWithAuth().get('/api/users/', {
            params: { isAuthorized: false, role: 'staff' }
        }).then((res) => {
            const { users: usersData } = res.data.payload
            console.log(usersData)
            setUsers(usersData)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className='list-container'>
            <div className={classes.demo}>
                <List >
                    {
                        users.map((user) => {
                            return (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${user.first_name} ${user.last_name}  (${user.email})`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => verifyStaffMember(user.user_id)}>
                                            <CheckCircleIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="Yup" onClick={() => declineStaffMember(user.user_id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </div>
    )
}

export default Pending