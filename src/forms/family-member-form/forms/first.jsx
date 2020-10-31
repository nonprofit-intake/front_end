import React from 'react'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import './forms.scss'

const First = ({ setFormValues,formValues, handleChange }) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFormValues({
            ...formValues,
            'dob': date
        })
    };
    return (
        <form className="multi-form-container" >
            <div className="text-fields-container-multiform">
                    <TextField
                        value={formValues.relationship_to_HoH}
                        onChange={handleChange}
                        type="text"
                        label="Relationship to head of household"
                        name="relationship_to_HoH"
                        required
                    />
                <div className='name-container'>
                    <TextField
                        value={formValues.first_name}
                        onChange={handleChange}
                        type="text"
                        label="First Name"
                        name="first_name"
                        required
                    />
                    <TextField
                        value={formValues.last_name}
                        onChange={handleChange}
                        type="text"
                        label="Last Name"
                        name="last_name"
                        required
                    />
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        name='dob'
                        margin="normal"
                        id="time-picker"
                        label="Date of Birth"
                        value={formValues.dob}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <div className='name-container'>
                    <TextField
                        value={formValues.race}
                        onChange={handleChange}
                        type="text"
                        label="Race"
                        name="race"
                        required
                    />
                    
                    <TextField
                        value={formValues.ethnicity}
                        onChange={handleChange}
                        type="text"
                        label="Ethnicity"
                        name="ethnicity"
                        required
                    />
                </div>
                <TextField value={formValues.gender} onChange={handleChange} name='gender' id="select" label="Gender" select>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                    <MenuItem value="rather_not_say">Rather Not Say</MenuItem>
                </TextField>
                <div className='name-container'>
                    <TextField
                        value={formValues.income_source}
                        onChange={handleChange}
                        type="text"
                        label="Income Source"
                        name="income_source"
                        required
                    />
                    <TextField
                        value={formValues.income_at_entry}
                        onChange={handleChange}
                        type="text"
                        label="Monthly Pay"
                        name="income_at_entry"
                    />
                </div>
                <TextField
                    value={formValues.employer}
                    onChange={handleChange}
                    type="text"
                    label="Employer"
                    name="employer"
                />
            </div>
        </form>
    )
}

export default First