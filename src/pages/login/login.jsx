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
        email: '',
        password: ''
    })

    const login = (e) => {
        e.preventDefault()
        const user = {
            email: formValues.email,
            password: formValues.password
        }
    }

    const clearForm = () => {
        setFormValues({
            username: '',
            password: ''
        })
    }
    return (
        <form className='form-container' onSubmit={login}>
            <div className='text-field-containers'>
                <TextField value={formValues.email} onChange={handleChange} color='primary' type='email' label='Email' name='email' required></TextField>
                <TextField value={formValues.password} onChange={handleChange} color='primary' type='password' label='Password' name='password' required></TextField>
                <Button type="submit" color='secondary' variant='outlined' id='submit-btn'>Login</Button>
            </div>
        </form>
    )
}


export default Login