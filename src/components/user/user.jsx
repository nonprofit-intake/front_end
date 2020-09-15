import React from 'react'
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core'
import './user.scss'
import { useHistory } from 'react-router-dom'
import { deleteUser } from '../../redux/actions/actions'
import { useDispatch } from 'react-redux'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const User = ({ name, role, username, id }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleRedirect = (id) => {
        history.push(`/edit-user/${id}`)
    }
    const handleDelete = (id) => {
        dispatch(deleteUser(id))
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper elevation={1} id='paper'>
            <div className='column'>
                <h4>Name</h4>
                <span>{name}</span>
            </div>
            <div className='column'>
                <h4>Username</h4>
                <span>{username}</span>
            </div>
            <div className='column'>
                <h4>Role</h4>
                <span>{role}</span>
            </div>
            <div className='buttons'>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <MoreVertIcon />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleRedirect(id)}>Edit</MenuItem>
                    <MenuItem onDoubleClick={() => handleDelete(id)}>Delete User</MenuItem>
                </Menu>
            </div>
        </Paper>
    )
}

export default User