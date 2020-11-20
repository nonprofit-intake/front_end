import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import './forms.scss';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

let previousLivingSituationOptions = [
	'Emergency shelter, including hotel or motel paid for with emergency shelter voucher, or RHY-funded Host Home shelter',
	'Safe Haven',
	'Foster care home or foster care group home',
	'Hospital or other residential non-psychiatric medical facility',
	'Jail, prison or juvenile detention facility',
	'Long-term care facility or nursing home',
	'Psychiatric hospital or other psychiatric facility',
	'Substance abuse treatment facility or detox center',
	'Residential project or halfway house with no homeless criteria',
	'Hotel or motel paid for without emergency shelter voucher',
	'Rental by client, with VASH housing subsidy',
	'Transitional housing for homeless persons (including homeless youth)',
	'Host Home (non-crisis)',
	"Staying or living in a friend's room, apartment or house",
	"Staying or living in a family member's room, apartment or house",
	'Rental by client, with GPD TIP housing subsidy',
	'Permanent housing (other than RRH) for formerly homeless persons',
	'Rental by client, with RRH or equivalent subsidy',
	'Rental by client, with HCV voucher (tenant or project based)',
	'Rental by client in a public housing unit',
	'Rental by client, no ongoing housing subsidy',
	'Rental by client, with other ongoing housing subsidy',
	'Owned by client, with ongoing housing subsidy',
	'Owned by client, no ongoing housing subsidy',
	"Client doesn't know",
	'Client refused',
	'Data not collected'
];

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		width: '100%',
		justifyContent: 'end'
	},
	formControl: {
		margin: theme.spacing(3)
	}
}));

const PreviousLocationsForm = ({ setFormValues, formValues, handleChange }) => {
	const [ selectedDate, setSelectedDate ] = React.useState(new Date());
	const classes = useStyles();

	const handleDateChange = (date) => {
		setFormValues({
			...formValues,
			homeless_start_date: date
		});
	};

	const handleDateOfFirstStayChange = (date) => {
		setFormValues({
			...formValues,
			date_of_first_stay: date
		});
	};

	const handleCheckbox = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.checked });
		console.log(formValues);
	};
	// Find the right column for "where did you stay last night"
	return (
		<form className="multi-form-container">
			<div className="text-fields-container-multiform">
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<FormLabel>
						What was your prior living situation like? (Choose whichever best fits the description)
					</FormLabel>
					<TextField
						value={formValues.living_situation}
						onChange={handleChange}
						name="living_situation"
						label="Living Situation"
						select
					>
						{previousLivingSituationOptions.map((opt) => {
							return <MenuItem value={opt}>{opt}</MenuItem>;
						})}
					</TextField>
				</div>
				<TextField
					value={formValues.last_perm_address}
					onChange={handleChange}
					type="text"
					label="Last Permanent Address"
					name="last_perm_address"
					required
				/>
				<div style={{ display: 'flex', gridGap: '1rem' }}>
					<TextField
						value={formValues.state}
						onChange={handleChange}
						type="text"
						label="State"
						name="state"
						required
					/>
					<TextField
						value={formValues.city}
						onChange={handleChange}
						type="text"
						label="City"
						name="city"
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

				<div className="third-form-questions">
					<FormLabel component="legend">How long did you stay at this location?</FormLabel>
					<TextField
						value={formValues.length_of_stay}
						onChange={handleChange}
						type="text"
						name="length_of_stay"
						required
						label="days/months/years"
					/>
				</div>
				<div className="third-form-question">
					<FormLabel component="legend">Approximate date you became homeless</FormLabel>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							name=" homeless_start_date"
							format="MM/dd/yyyy"
							margin="normal"
							id="time-picker"
							label="mm/dd/yyyy"
							value={formValues.homeless_start_date}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change time'
							}}
						/>
					</MuiPickersUtilsProvider>
				</div>
				<div className="third-form-questions">
					<FormLabel component="legend">How many times have you been homeless in the last 3 years?</FormLabel>
					<TextField
						value={formValues.times_homeless_last_3years}
						onChange={handleChange}
						type="text"
						name="times_homeless_last_3years"
						required
					/>
				</div>
				<div className="third-form-questions">
					<FormLabel component="legend">
						Total # of months you have been homeless all together in the last 3 years?
					</FormLabel>
					<TextField
						value={formValues.total_months_homeless}
						onChange={handleChange}
						type="text"
						name="total_months_homeless"
						required
					/>
				</div>

				<FormControl component="fieldset">
					<FormLabel component="legend">Please Check all the you currently receive</FormLabel>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox checked={formValues.foodstamps} onChange={handleCheckbox} name="foodstamps" />
							}
							label="Foodstamps"
						/>
						<FormControlLabel
							control={
								<Checkbox checked={formValues.cps_or_fps} onChange={handleCheckbox} name="cps_or_fps" />
							}
							label="CPS/FPS (Open case)"
						/>
						<FormControlLabel
							control={<Checkbox checked={formValues.rrh} onChange={handleCheckbox} name="rrh" />}
							label="RRH (Rapid Rehousing)	"
						/>
					</FormGroup>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									checked={formValues.housing_voucher}
									onChange={handleCheckbox}
									name="housing_voucher"
								/>
							}
							label="Housing Voucher (Current)"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={formValues.veteran_services}
									onChange={handleCheckbox}
									name="veteran_services"
								/>
							}
							label="Veteran Services"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={formValues.snap_assistance}
									onChange={handleCheckbox}
									name="snap_assistance"
								/>
							}
							label="SNAP assistance"
						/>
					</FormGroup>
					<FormHelperText>Be careful</FormHelperText>
				</FormControl>

				<FormControl component="fieldset">
					<FormLabel component="legend">Are you covered by health insurance?</FormLabel>
					<RadioGroup
						value={formValues.covered_by_health_insurance}
						aria-label="gender"
						name="covered_by_health_insurance"
						onChange={handleChange}
					>
						<FormControlLabel value="yes" control={<Radio />} label="Yes" />
						<FormControlLabel value="no" control={<Radio />} label="No" />
					</RadioGroup>
				</FormControl>
				<FormControl component="fieldset">
					<FormLabel component="legend">Please select all sources of your healthcare income</FormLabel>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									checked={formValues.state_funded}
									onChange={handleCheckbox}
									name="state_funded"
								/>
							}
							label="State Funded"
						/>
						<FormControlLabel
							control={<Checkbox checked={formValues.private} onChange={handleCheckbox} name="private" />}
							label="Private"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={formValues.private_individual}
									onChange={handleCheckbox}
									name="private_individual"
								/>
							}
							label="Private Individual"
						/>
					</FormGroup>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox checked={formValues.medicaid} onChange={handleCheckbox} name="medicaid" />
							}
							label="Medicaid"
						/>
						<FormControlLabel
							control={<Checkbox checked={formValues.VAMS} onChange={handleCheckbox} name="VAMS" />}
							label="Veteran Medical Services"
						/>
						<FormControlLabel
							control={
								<Checkbox checked={formValues.medicare} onChange={handleCheckbox} name="medicare" />
							}
							label="Medicare"
						/>
						<FormControlLabel
							control={<Checkbox checked={formValues.other} onChange={handleCheckbox} name="other" />}
							label="other"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={formValues.other_public}
									onChange={handleCheckbox}
									name="other_public"
								/>
							}
							label="Other Public"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={formValues.indian_health_services}
									onChange={handleCheckbox}
									name="indian_health_services"
								/>
							}
							label="Indian Health Services"
						/>
					</FormGroup>
				</FormControl>
				<hr />
			</div>
		</form>
	);
};

export default PreviousLocationsForm;
{
	/* <TextField
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
                /> */
}
