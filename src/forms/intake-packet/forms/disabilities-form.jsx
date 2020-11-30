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

const DisabilitiesForm = ({ setFormValues, formValues, handleChange }) => {
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
				<div>
					<FormLabel component="legend">Alcholol Abuse</FormLabel>
					<RadioGroup
						onChange={handleChange}
						aria-label="gender"
						name="alcohol_abuse"
						value={formValues.alcohol_abuse}
						onChange={handleChange}
					>
						<FormControlLabel value="yes" control={<Radio />} label="Yes" />
						<FormControlLabel value="no" control={<Radio />} label="No" />
					</RadioGroup>
				</div>
				<div>
					<FormLabel component="legend">Developmental Disability</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="developmental_disability"
						value={formValues.developmental_disability}
						onChange={handleChange}
					>
						<FormControlLabel value="yes" control={<Radio />} label="Yes" />
						<FormControlLabel value="no" control={<Radio />} label="No" />
					</RadioGroup>
				</div>
				<div>
					<FormLabel component="legend">Chronic Health Issues</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="chronic_health_condition"
						value={formValues.chronic_health_condition}
						onChange={handleChange}
					>
						<FormControlLabel value="yes" control={<Radio />} label="Yes" />
						<FormControlLabel value="no" control={<Radio />} label="No" />
					</RadioGroup>
				</div>
				<div>
					<FormLabel component="legend">Drug Issues</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="substance_abuse"
						value={formValues.substance_abuse}
						onChange={handleChange}
					>
						<FormControlLabel value="yes" control={<Radio />} label="Yes" />
						<FormControlLabel value="no" control={<Radio />} label="No" />
					</RadioGroup>
				</div>
				<div>
					<FormLabel component="legend">HIV/AIDS</FormLabel>
					<RadioGroup aria-label="gender" name="HIV_AIDS" value={formValues.HIV_AIDS} onChange={handleChange}>
						<FormControlLabel value="yes" control={<Radio />} label="Yes" />
						<FormControlLabel value="no" control={<Radio />} label="No" />
					</RadioGroup>
				</div>
				<div>
					<FormLabel component="legend">Mental Illness</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="mental_health_problem"
						value={formValues.mental_health_problem}
						onChange={handleChange}
					>
						<FormControlLabel value="yes" control={<Radio />} label="Yes" />
						<FormControlLabel value="no" control={<Radio />} label="No" />
					</RadioGroup>
				</div>
				<div>
					<FormLabel component="legend">Physical Disability</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="physical_disability"
						value={formValues.physical_disability}
						onChange={handleChange}
					>
						<FormControlLabel value="yes" control={<Radio />} label="Yes" />
						<FormControlLabel value="no" control={<Radio />} label="No" />
					</RadioGroup>
				</div>
			</div>
		</form>
	);
};

export default DisabilitiesForm;
