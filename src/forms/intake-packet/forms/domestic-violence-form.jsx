import React from 'react';
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';

import { registerUser } from '../../../redux/actions/staffActions';
import DateFnsUtils from '@date-io/date-fns';

import { clearErrors } from '../../../redux/actions/actions';
import Loading from '../../../components/loading/loading';
import { axiosWithAuth } from '../../../utils/auth/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const DomesticViolenceForm = ({ incrementStep, setFormValues, formValues, handleChange }) => {
	const [ selectedDate, setSelectedDate ] = React.useState(new Date());
	const [ pregnancyDate, setPregnancyDate ] = React.useState(new Date());

	const dispatch = useDispatch();
	const apiError = useSelector((state) => state.apiError);
	const isLoading = useSelector((state) => state.isLoading);

	const handleDateChange = (date) => {
		setSelectedDate(date);
		setFormValues({
			...formValues,
			when_dv_occured: date
		});
	};

	const handlePregnancyDateChage = (date) => {
		setPregnancyDate(date);
		setFormValues({
			...formValues,
			pregnancy_due_date: date
		});
	};

	return (
		<form className="multi-form-container">
			<div className="text-fields-container-multiform">
				<TextField
					value={formValues.personal_phone}
					onChange={handleChange}
					type="text"
					label="Personal phone number"
					name="preferred_language"
					required
				/>

				<TextField
					value={formValues.work_phone}
					onChange={handleChange}
					type="text"
					label="Work phone number"
					name="preferred_language"
					required
				/>

				<TextField
					value={formValues.emergency_contact_name}
					onChange={handleChange}
					type="text"
					label="Emergency Contact Name"
					name="preferred_language"
					required
				/>

				<TextField
					value={formValues.emergency_contact_number}
					onChange={handleChange}
					type="text"
					label="Emergency Contact Number"
					name="preferred_language"
					required
				/>

				<div>
					<FormLabel component="legend">
						Are you <strong>Currently</strong> fleeing a DV situation?
					</FormLabel>
					<RadioGroup
						aria-label="gender"
						name="currently_fleeing"
						value={formValues.currently_fleeing}
						onChange={handleChange}
					>
						<FormControlLabel value="yes" control={<Radio />} label="Yes" />
						<FormControlLabel value="no" control={<Radio />} label="No" />
					</RadioGroup>
				</div>
				{formValues.currently_fleeing == 'yes' && (
					<div>
						<div>
							<FormLabel component="legend">Have you contacted the YWCA?</FormLabel>
							<RadioGroup
								aria-label="gender"
								name="contacted_ywca"
								value={formValues.contacted_ywca}
								onChange={handleChange}
							>
								<FormControlLabel value="yes" control={<Radio />} label="Yes" />
								<FormControlLabel value="no" control={<Radio />} label="No" />
							</RadioGroup>
						</div>
						{formValues.contacted_ywca == 'no' && (
							<h3>At this time, please give the client a YWCA phone number to call</h3>
						)}
						{/* <div>
							<FormLabel component="legend">Do you wish to be entered into HMIS anonymously?</FormLabel>
							<RadioGroup
								aria-label="gender"
								name="anon_user"
								value={formValues.anon_user}
								onChange={handleChange}
							>
								<FormControlLabel value="yes" control={<Radio />} label="Yes" />
								<FormControlLabel value="no" control={<Radio />} label="No" />
							</RadioGroup>
						</div> */}
						<div className="third-form-question">
							<FormLabel component="legend">Date of most recent DV incident</FormLabel>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									name="when_dv_occured"
									format="MM/dd/yyyy"
									margin="normal"
									id="time-picker"
									label="mm/dd/yyyy"
									value={formValues.when_dv_occured}
									onChange={handleDateChange}
									KeyboardButtonProps={{
										'aria-label': 'change time'
									}}
								/>
							</MuiPickersUtilsProvider>
						</div>
						{/* <div>
							<FormLabel component="legend">
								Is there a No Contact or any other Court Order in place?
							</FormLabel>
							<RadioGroup
								aria-label="gender"
								name="no_contact"
								value={formValues.no_contact}
								onChange={handleChange}
							>
								<FormControlLabel value="yes" control={<Radio />} label="Yes" />
								<FormControlLabel value="no" control={<Radio />} label="No" />
							</RadioGroup>
						</div> */}
					</div>
				)}
			</div>
		</form>
	);
};

export default DomesticViolenceForm;
