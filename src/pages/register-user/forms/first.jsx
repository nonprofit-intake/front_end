import React from 'react'
import 'date-fns';
import TextField from '@material-ui/core/TextField'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'

import { registerUser } from '../../../redux/actions/staffActions'

import { clearErrors } from '../../../redux/actions/actions'
import Loading from '../../../components/loading/loading'
import './forms.scss'
import { axiosWithAuth } from '../../../utils/auth/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const First = ({ incrementStep, setFormValues, formValues, handleChange }) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const dispatch = useDispatch()
    const apiError = useSelector(state => state.apiError)
    const isLoading = useSelector(state => state.isLoading)
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFormValues({
            ...formValues,
            'dob': date
        })
    };

    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            email: formValues.email,
            pin: formValues.last_4_digits_of_ssn
        }

        console.log(user)
        dispatch(registerUser(user, history, incrementStep))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='text-fields-container-multiform'>
                    <TextField value={formValues.first_name} onChange={handleChange} color='primary' type='text' label='First Name' name='first_name' required></TextField>
                    <TextField value={formValues.last_name} onChange={handleChange} color='primary' type='text' label='Last Name' name='last_name' required></TextField>
                    <TextField value={formValues.email} onChange={handleChange} color='primary' type='email' label='Email' name='email' required></TextField>
                    <TextField value={formValues.last_4_digits_of_ssn} onChange={handleChange} color='primary' type='text' label='Last 4 digits of SSN or PIN' name='last_4_digits_of_ssn' required></TextField>
                    <div className='submit-btn'>
                        <Button type="submit" color='secondary' variant='outlined' id='submit-btn' onClick={() => dispatch(clearErrors())}>Create Family Account</Button>
                        {
                            apiError && <span className='error-msg'>{apiError}</span>
                        }
                    </div>
                </div>
            </form>
            {isLoading && <Loading />}
        </div>
    )
}

export default First