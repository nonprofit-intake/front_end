import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import './login.styles.scss'


const Login = () => {
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }
    const [formValues, setFormValues] = useState({
        username: 'isaiah123',
        password: 'Isaiah123'
    })

    const login = (e) => {
        e.preventDefault()
        const user = {
            username: formValues.username,
            password: formValues.password
        }
        console.log(user)
    }

    const clearForm = () => {
        setFormValues({
            username: '',
            password: ''
        })
    }
    return (
        <form className='form-login-container' onSubmit={login}>
            <div className='text-field-containers'>
                <TextField value={formValues.username} onChange={handleChange} color='primary' type='text' label='Username' name='username' required></TextField>
                <TextField value={formValues.password} onChange={handleChange} color='primary' type='password' label='Password' name='password' required></TextField>
                <Button type="submit" color='secondary' variant='outlined' id='submit-btn'>Login</Button>
            </div>
        </form>
    )
}


export default Login