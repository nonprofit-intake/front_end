import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import './register-user.scss'
import { login as loginUser, clearErrors } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ProgressBar from '../../components/progress-bar/progress-bar'
import { registerUser } from '../../redux/actions/staffActions'


const RegisterUser = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const apiError = useSelector(state => state.apiError)
    const isLoading = useSelector(state => state.isLoading)

    useEffect(() => {
        dispatch(clearErrors())
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        if (apiError) {
            dispatch(clearErrors())
        }

        setFormValues({
            ...formValues,
            [name]: value
        })
    }
    const [formValues, setFormValues] = useState({
        first_name: 'Isaiah',
        last_name: 'Fowler',
        email: 'dev@gmail.com',
        password: 'password',
        pin: '2345'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            email: formValues.email,
            pin: formValues.pin
        }
        console.log(user)
        dispatch(registerUser(user, history))
    }

    const clearForm = () => {
        setFormValues({
            username: '',
            password: ''
        })
    }
    return (
        <div>
            <form className='form-login-container' onSubmit={handleSubmit}>
                <div className='text-field-containers'>
                    <TextField value={formValues.first_name} onChange={handleChange} color='primary' type='text' label='First Name' name='first_name' required></TextField>
                    <TextField value={formValues.last_name} onChange={handleChange} color='primary' type='text' label='Last Name' name='last_name' required></TextField>
                    <TextField value={formValues.email} onChange={handleChange} color='primary' type='email' label='Email' name='email' required></TextField>
                    <TextField value={formValues.pin} onChange={handleChange} color='primary' type='text' label='PIN' name='pin' required></TextField>
                    <div className='submit-btn'>
                        <Button type="submit" color='secondary' variant='outlined' id='submit-btn' onClick={() => dispatch(clearErrors())}>Register Family</Button>
                        {
                            apiError && <span className='error-msg'>{apiError}</span>
                        }
                    </div>
                </div>
            </form>
            {isLoading && <ProgressBar />}
        </div>
    )
}


export default RegisterUser