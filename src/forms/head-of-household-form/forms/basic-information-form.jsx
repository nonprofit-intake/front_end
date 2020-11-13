import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

import './forms.scss';
const BasicInformationForm = ({ setFormValues, formValues, handleChange }) => {
	const [ selectedDate, setSelectedDate ] = React.useState(new Date());

	const handleDateChange = (date) => {
		setSelectedDate(date);
		setFormValues({
			...formValues,
			dob: date
		});
	};

	return (
		<form className="multi-form-container">
			<div className="text-fields-container-multiform">
				<div className="name-container">
					<TextField
						value={formValues.first_name}
						onChange={handleChange}
						type="text"
						label="First Name"
						name="first_name"
						required
					/>
					<TextField
						value={formValues.middle_name}
						onChange={handleChange}
						type="text"
						label="Middle Name"
						name="middle_name"
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
				<div>
					<FormLabel component="legend">Are you a veteran?</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="vet_status"
						value={formValues.vet_status}
						onChange={handleChange}
					>
						<FormControlLabel value="yes" control={<Radio />} label="Yes" />
						<FormControlLabel value="no" control={<Radio />} label="No" />
						<FormControlLabel value="client Refused" control={<Radio />} label="Client Refused" />
					</RadioGroup>
				</div>
				<TextField
					value={formValues.preferred_language}
					onChange={handleChange}
					type="text"
					label="Preferred Language"
					name="preferred_language"
					required
				/>
				<TextField
					value={formValues.current_age}
					onChange={handleChange}
					type="text"
					label="Age"
					name="current_age"
					required
				/>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						name="dob"
						margin="normal"
						id="time-picker"
						label="Date of Birth"
						value={formValues.dob}
						onChange={handleDateChange}
						KeyboardButtonProps={{
							'aria-label': 'change time'
						}}
					/>
				</MuiPickersUtilsProvider>
				<div className="name-container">
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
				<TextField
					value={formValues.gender}
					onChange={handleChange}
					name="gender"
					id="select"
					label="Gender"
					select
				>
					<MenuItem value="Male">Male</MenuItem>
					<MenuItem value="Female">Female</MenuItem>
					<MenuItem value="Other">Other</MenuItem>
					<MenuItem value="rather_not_say">Rather Not Say</MenuItem>
				</TextField>
				<TextField
					value={formValues.sexual_orientation}
					onChange={handleChange}
					name="sexual_orientation"
					id="select"
					label="Sexual Orientation (optional)"
					select
					optional
				>
					<MenuItem value="Heterosexual">Heterosexual</MenuItem>
					<MenuItem value="Gay">Gay</MenuItem>
					<MenuItem value="Lesbian">Lesbian</MenuItem>
					<MenuItem value="Bisexual">Bisexual</MenuItem>
					<MenuItem value="Questioning / Unsure">Questioning / Unsure</MenuItem>
					<MenuItem value="Other">Other</MenuItem>
					<MenuItem value="Client doesn't know">Unsure</MenuItem>
					<MenuItem value="Client Refused">Client Refused</MenuItem>
				</TextField>
				<div className="name-container">
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
	);
};

export default BasicInformationForm;
