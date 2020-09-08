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
        username: 'test',
        password: 'testpassword'
    })

    const login = (e) => {
        e.preventDefault()
        const user = {
            username: formValues.username,
            password: formValues.password
        }
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
                    <TextField value={formValues.username} onChange={handleChange} color='primary' type='text' label='Username' name='username' required></TextField>
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