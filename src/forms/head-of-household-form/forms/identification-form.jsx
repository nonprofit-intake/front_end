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

const altenative_id_options = [
	'Military ID',
	'Medical Insurance cards',
	'Birth Certificates',
	'DSHS document with names and birthdays',
	'Credit/Debit Cards',
	'SSI documents with names and birthdays',
	'Costco Card',
	'CPS documents with names and birthdays',
	'Library Card',
	'Social Security Cards',
	'Utility bill',
	'School transcripts/School ID',
	'Marriage/Divorce License',
	'Jail Booking ID documents',
	'Fishing/Hunting License',
	'Medical bill with name and birthday',
	'Prescription bottle with name and birthday'
];

const IdentificationForm = ({ setFormValues, formValues, handleChange }) => {
	return (
		<form className="multi-form-container">
			<div className="text-fields-container-multiform">
				<FormLabel component="legend">
					Ask: Do you have a Driver’s License, Passport, Military Card or State issued ID card?
				</FormLabel>
				<RadioGroup aria-label="gender" name="has_id" value={formValues.has_id} onChange={handleChange}>
					<FormControlLabel value={'yes'} control={<Radio />} label="Yes" />
					<FormControlLabel value={'no'} control={<Radio />} label="No" />
				</RadioGroup>

				{
					formValues.has_id == 'yes' &&
					<div className="alternative-id-field">
							<TextField
								value={formValues.id_options}
								onChange={handleChange}
								name="id_options"
								id="select"
								label="id options"
								select
							>
								<MenuItem value={'passport'}>passport</MenuItem>
								<MenuItem value={'drivers liscense'}>drivers liscense</MenuItem>
								<MenuItem value={'military card'}>Military Card</MenuItem>
								<MenuItem value={'state issued id'}>State Issued ID</MenuItem>

							</TextField>

							<TextField
								onChange={handleChange}
								name={'alternative_id'}
								value={formValues.altenative_id}
								label="value"
							/>
						</div>
				}

				
				{formValues.has_id == 'no' && (
					<div className="text-fields-container-multiform">
						<FormLabel component="legend">
							Ask: What is the main barrier for not having attained legal ID?
						</FormLabel>
						<TextField
							value={formValues.reason_for_not_having_id}
							name="reason_for_not_having_id"
							label="Response"
							multiline
							rows={4}
							onChange={handleChange}
						/>
						<FormLabel component="legend">
							Please choose an Alternative form of ID
						</FormLabel>
						<div className="alternative-id-field">
							<TextField
								value={formValues.gender}
								onChange={handleChange}
								name="gender"
								id="select"
								label="Alternative ID options"
								select
							>
								{altenative_id_options.map((option) => {
									return <MenuItem value={option}>{option}</MenuItem>;
								})}
							</TextField>

							<TextField
								onChange={handleChange}
								name={'alternative_id'}
								value={formValues.altenative_id}
								label="value"
							/>
						</div>
					</div>
				)}

				{/* {formValues.has_id == 'yes' && <h1>Has id</h1>}

				{formValues.has_id == 'no' && ()} */}
			</div>
		</form>
	);
};

export default IdentificationForm;
