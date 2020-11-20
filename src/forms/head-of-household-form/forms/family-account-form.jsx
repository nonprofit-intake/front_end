import React, { useState } from 'react';
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { registerUser } from '../../../redux/actions/staffActions';

import ProgressBar from '../../../components/progress-bar/progress-bar';
import { clearErrors } from '../../../redux/actions/actions';
import Loading from '../../../components/loading/loading';
import './forms.scss';
import { axiosWithAuth } from '../../../utils/auth/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import faker from 'faker/locale/en';
import MenuItem from '@material-ui/core/MenuItem';

var randomName = faker.name.findName(); // Rowan Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomCard = faker.helpers.createCard(); // random contact card containing many properties

const FamilyAccountForm = ({
	setUserId,
	setRegisteredAccount,
	incrementStep,
	setFormValues,
	formValues,
	handleChange
}) => {
	const [ selectedDate, setSelectedDate ] = React.useState(new Date());
	const [ loading, setLoading ] = useState(false);
	const [ errors, setErrors ] = useState(null);
	const dispatch = useDispatch();

	const generatePassword = (user) => {
		let first_initial = user.first_name[0].toLowerCase();
		let last_name = user.last_name.toLowerCase();
		let pin = user.pin;

		return first_initial + last_name + pin;
	};

	const apiError = useSelector((state) => state.apiError);
	const isLoading = useSelector((state) => state.isLoading);

	const handleDateChange = (date) => {
		setSelectedDate(date);
		setFormValues({
			...formValues,
			dob: date
		});
	};

	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		const user = {
			first_name: formValues.first_name,
			last_name: formValues.last_name,
			email: formValues.email,
			pin: formValues.pin
		};

		user.password = generatePassword(user);

		axiosWithAuth()
			.post('/api/v1/auth/staff/register', user)
			.then((res) => {
				
				setUserId(res.data.payload.user.id);
				setRegisteredAccount(true);
			})
			.catch((err) => {
				console.log(err);
				setErrors(err.response.data.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div style={{ width: '100%' }}>
			<form onSubmit={handleSubmit}>
				<div className="text-fields-container-multiform">
					<TextField
						value={formValues.project_name}
						onChange={handleChange}
						name="project_name"
						id="select"
						label="Project Name"
						select
					>
						<MenuItem value={'FPS--ES--Bridges Family Shelter'}>FPS--ES--Bridges Family Shelter</MenuItem>
						<MenuItem value={'FPS--ES--Open Doors'}>FPS--ES--Open Doors</MenuItem>
						<MenuItem value={'FPS--HP--Neighbors'}>FPS--HP--Neighbors</MenuItem>
						<MenuItem value={'FPS--SSO--Open Doors'}>FPS--SSO--Open Doors</MenuItem>
						<MenuItem value={'FPS--SSO--Village'}>FPS--SSO--Village</MenuItem>
					</TextField>

					<div className="name-container">
						<TextField
							value={formValues.first_name}
							onChange={handleChange}
							color="primary"
							type="text"
							label="First Name"
							name="first_name"
							required
						/>
						<TextField
							value={formValues.middle_name}
							onChange={handleChange}
							color="primary"
							type="text"
							label="Middle Name"
							name="middle_name"
						/>
						<TextField
							value={formValues.last_name}
							onChange={handleChange}
							color="primary"
							type="text"
							label="Last Name"
							name="last_name"
							required
						/>
					</div>
					<TextField
						value={formValues.email}
						onChange={handleChange}
						color="primary"
						type="email"
						label="Email"
						name="email"
						required
					/>
					<TextField
						value={formValues.pin}
						onChange={handleChange}
						color="primary"
						type="text"
						label="Last 4 digits of SSN or PIN"
						name="pin"
						required
					/>
					<div className="submit-btn">
						<Button
							type="submit"
							color="secondary"
							variant="outlined"
							id="submit-btn"
							onClick={() => dispatch(clearErrors())}
						>
							Create Family Account
						</Button>
						{errors && <span className="error-msg">{errors}</span>}
					</div>
				</div>
			</form>
			{loading && <ProgressBar />}
		</div>
	);
};

export default FamilyAccountForm;
