
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import './edit-user.styles.scss'
import { TextField, Button } from '@material-ui/core'
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth'
import { fetchUserById } from '../../api/fetchUserById'
import { InputLabel, Select, MenuItem } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/actions'
import Loading from '../../components/loading/loading'
import ProgressBar from '../../components/progress-bar/progress-bar'


const EditUser = () => {
    const apiError = useSelector(state => state.apiError)
    const history = useHistory()
    const dispatch = useDispatch()
    const params = useParams()
    const isLoading = useSelector(state => state.isLoading)


    const [copy, setCopy] = useState({
        name: '',
        username: '',
        password: '',
        role: ''
    })

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

        // if the username hasn't been changed set it to undefined
        if (formValues.username == copy.username) {
            formValues.username = undefined
        }
        dispatch(updateUser(formValues, params.id, history))
    }

    useEffect(() => {
        dispatch({ type: "IS_LOADING" })
        fetchUserById(params.id).then(res => {
            const { user } = res.payload
            setFormValues(user)
            setCopy(user)
            dispatch({ type: "IS_NOT_LOADING" })
        }).catch(err => {
            alert("Unable to find user")
            history.push('/')
        })
    }, [])

    if (isLoading) {
        return <Loading />
    }

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
            {isLoading && <Loading />}
        </form>
    )
}

export default EditUser