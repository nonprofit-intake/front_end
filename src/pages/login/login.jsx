import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import './login.styles.scss'
import { login as loginUser, clearErrors } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ProgressBar from '../../components/progress-bar/progress-bar'

const Login = () => {
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
        email: 'dev@gmail.com',
        password: 'password'
    })

    const login = (e) => {
        e.preventDefault()
        const user = {
            email: formValues.email,
            password: formValues.password
        }
        console.log(user)
        dispatch(loginUser(user, history))
    }

    const clearForm = () => {
        setFormValues({
            username: '',
            password: ''
        })
    }
    return (
        <div>
            <form className='form-login-container' onSubmit={login}>
                <div className='text-field-containers'>
                    <TextField value={formValues.email} onChange={handleChange} color='primary' type='email' label='Email' name='email' required></TextField>
                    <TextField value={formValues.password} onChange={handleChange} color='primary' type='password' label='Password' name='password' required></TextField>
                    <div className='submit-btn'>
                        <Button type="submit" color='secondary' variant='outlined' id='submit-btn' onClick={() => dispatch(clearErrors())}>Login</Button>
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


export default Login