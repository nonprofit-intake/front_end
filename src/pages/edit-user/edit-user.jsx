
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './edit-user.styles.scss'
import { TextField, Button } from '@material-ui/core'
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth'
import { fetchUserById } from '../../api/fetchUserById'
import { InputLabel, Select, MenuItem } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/actions'

const EditUser = () => {
    const apiError = useSelector(state => state.apiError)
    const history = useHistory()
    const dispatch = useDispatch()
    const params = useParams()

    const [formValues, setFormValues] = useState({
        name: '',
        username: '',
        password: '',
        role: ''
    })

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser(formValues, params.id, history))
    }

    useEffect(() => {
        fetchUserById(params.id).then(res => {
            const { user } = res.payload
            setFormValues(user)
        }).catch(err => {
            alert("Unable to find user")
            history.push('/')
        })
    }, [])

    return (
        <form className='edit-form-container' onSubmit={handleSubmit}>
            <div className='text-fields-container'>
                <TextField onChange={handleChange} value={formValues.name} color='primary' type='text' label='Name' name='name' ></TextField>
                <TextField onChange={handleChange} value={formValues.username} color='primary' type='text' label='Username' name='username' ></TextField>
                <TextField label='Role' value={formValues.role} name='role' select onChange={handleChange}>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="staff">Staff</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                </TextField>
                <Button type="submit" color='secondary' variant='outlined' id='submit-btn'>Save</Button>
                {apiError && <span>{apiError}</span>}
            </div>
        </form>
    )
}

export default EditUser