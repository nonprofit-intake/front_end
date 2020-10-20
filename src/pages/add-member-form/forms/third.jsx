import React from 'react'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import './forms.scss'

const Third = ({ formValues, handleChange }) => {
    return (
        <form className="multi-form-container" >
            <div className="text-fields-container-multiform">
                {/* <TextField
                    value={formValues.relationship_to_HoH}
                    onChange={handleChange}
                    type="text"
                    label="Relationship to head of household"
                    name="relationship_to_HoH"
                    required
                /> */}

                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                    </MuiPickersUtilsProvider> */}
                <div>
                    <FormLabel component="legend">Are you in School?</FormLabel>
                    <RadioGroup aria-label="gender" name="in_school" value={formValues.in_school} onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </div>
                {
                    formValues.in_school == 'yes' &&
                    <div className='text-fields-container-multiform'>
                        <div>
                            <FormLabel component="legend">Connected with McKinney-
                                Vento School</FormLabel>
                            <RadioGroup onChange={handleChange} aria-label="gender" name="connected_to_MVento" value={formValues.connected_to_MVento} onChange={handleChange}>
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </div>
                        <div className='input-with-label'>
                            <FormLabel component="legend">Attendace</FormLabel>
                            <TextField value={formValues.attendance_status} onChange={handleChange} name='gender' id="select" select>
                                <MenuItem value="regular">Regular</MenuItem>
                                <MenuItem value="irregular">irregular</MenuItem>
                                <MenuItem value="suspended">Suspended</MenuItem>
                                <MenuItem value="expelled">Expelled</MenuItem>
                                <MenuItem value="drop_out">Drop out</MenuItem>
                            </TextField>
                        </div>
                        <TextField
                            value={formValues.school_name}
                            onChange={handleChange}
                            type="text"
                            label="School Name"
                            name="school_name"
                            required
                        />
                        <div>
                            <FormLabel component="legend">Public Or Private?</FormLabel>
                            <RadioGroup onChange={handleChange} aria-label="gender" name="school_type" value={formValues.school_type} onChange={handleChange}>
                                <FormControlLabel value="public" control={<Radio />} label="Public" />
                                <FormControlLabel value="private" control={<Radio />} label="Private" />
                            </RadioGroup>
                        </div>
                        <div>
                            <FormLabel component="legend">Are you enrolled?</FormLabel>
                            <RadioGroup aria-label="gender" name="current_status" value={formValues.current_status} onChange={handleChange}>
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>
                        </div>

                            <TextField
                                value={formValues.last_grade_completed}
                                onChange={handleChange}
                                type="text"
                                label="Last Grade Completed"
                                name="last_grade_completed"
                                required
                            />

                    </div>
                }
            </div>
        </form>
    )
}

export default Third