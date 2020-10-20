import React from 'react'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import './forms.scss'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "100%",
        justifyContent: 'end'
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

const Third = ({ setFormValues, formValues, handleChange }) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const classes = useStyles()

    const handleDateChange = (date) => {
        setFormValues({
            ...formValues,
            'homeless_start_date': date
        })
    };

    const handleDateOfFirstStayChange = (date) => {
        setFormValues({
            ...formValues,
            'date_of_first_stay': date
        })
    }

    const handleCheckbox = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.checked });
        console.log(formValues)
    }

    return (
        <form className="multi-form-container" >
            <div className="text-fields-container-multiform">
                <div id='address-info'>
                    <TextField
                        value={formValues.last_perm_address}
                        onChange={handleChange}
                        type="text"
                        label="Last Permanent Address"
                        name="last_perm_address"
                        required
                    />
                    <TextField
                        value={formValues.zip}
                        onChange={handleChange}
                        type="text"
                        label="Zip"
                        name="zip"
                        required
                    />
                </div>
                <div className='third-form-questions'>
                    <FormLabel component="legend">Where did you stay last night?</FormLabel>
                    <TextField
                        value={formValues.zip}
                        onChange={handleChange}
                        type="text"
                        label="Address"
                        name="zip"
                        required
                    />
                </div>
                <div className='third-form-questions'>
                    <FormLabel component="legend">How long did you stay at this location?</FormLabel>
                    <TextField
                        value={formValues.length_of_stay}
                        onChange={handleChange}
                        type="text"
                        name="length_of_stay"
                        required
                        label='days/months/years'
                    />
                </div>
                <div className='third-form-question'>
                    <FormLabel component="legend">Approximate date you became homeless</FormLabel>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            name=' homeless_start_date'
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="time-picker"
                            label="mm/dd/yyyy"
                            value={formValues.homeless_start_date}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className='third-form-questions'>
                    <FormLabel component="legend">How many times have you been homeless in the last 3 years?</FormLabel>
                    <TextField
                        value={formValues.times_homeless_last_3years}
                        onChange={handleChange}
                        type="text"
                        name="times_homeless_last_3years"
                        required
                    />
                </div>
                <div className='third-form-questions'>
                    <FormLabel component="legend">Total # of months you have been homeless all together in the last 3 years?</FormLabel>
                    <TextField
                        value={formValues.total_months_homeless}
                        onChange={handleChange}
                        type="text"
                        name="total_months_homeless"
                        required
                    />
                </div>
                <div className='third-form-questions'>
                    <FormLabel component="legend">Have you used our shelter before? If yes, when</FormLabel>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            name='date_of_first_stay'
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="time-picker"
                            label="mm/dd/yyyy"
                            value={formValues.date_of_first_stay}
                            onChange={handleDateOfFirstStayChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Please Check all the you currently receive</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={formValues.foodstamps} onChange={handleCheckbox} name="foodstamps" />}
                            label="Foodstamps"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formValues.cps_or_fps} onChange={handleCheckbox} name="cps_or_fps" />}
                            label="CPS/FPS (Open case)"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formValues.rrh} onChange={handleCheckbox} name="rrh" />}
                            label="RRH (Rapid Rehousing)	"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={formValues.housing_voucher} onChange={handleCheckbox} name="housing_voucher" />}
                            label="Housing Voucher (Current)"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formValues.veteran_services} onChange={handleCheckbox} name="veteran_services" />}
                            label="Veteran Services"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formValues.snap_assistance} onChange={handleCheckbox} name="snap_assistance" />}
                            label="SNAP assistance"
                        />
                    </FormGroup>
                    <FormHelperText>Be careful</FormHelperText>
                </FormControl>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Are you covered by health insurance?</FormLabel>
                    <RadioGroup value={formValues.covered_by_health_insurance} aria-label="gender" name="covered_by_health_insurance" onChange={handleChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Please select all sources of your healthcare income</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={formValues.state_funded} onChange={handleCheckbox} name="state_funded" />}
                            label="State"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formValues.private} onChange={handleCheckbox} name="private" />}
                            label="Private"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={formValues.medicaid} onChange={handleCheckbox} name="medicaid" />}
                            label="Medicaid"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formValues.medicare} onChange={handleCheckbox} name="medicare" />}
                            label="Medicare"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={formValues.other} onChange={handleCheckbox} name="other" />}
                            label="other"
                        />
                    </FormGroup>
                    <FormHelperText>Be careful</FormHelperText>
                </FormControl>
                <hr/>
            </div>
        </form>
    )
}

export default Third
{/* <TextField
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
                /> */}