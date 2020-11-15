import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import './register-user.scss';
import { clearErrors } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProgressBar from '../../components/progress-bar/progress-bar';
import { registerUser } from '../../redux/actions/staffActions';
import MultiStepForm from './forms/index';
import Stepper from '../family-member-form/stepper/stepper';
import Loading from '../../components/loading/loading';
import faker from 'faker';
import './register-user.scss';
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth';
import FamilyAccountForm from './forms/family-account-form';

const INITIAL_VALUES = {
	project_name: 'FPS--ES--Open Doors',
	relationship_to_HoH: 'self'
};

const steps = [
	'identification/contact',
	'Basic Information',
	'Previous Locations/Healthcare',
	'Disabilities/Mental Illness',
	'DV/Pregnancy',
	'Sign and Submit'
];

const HeadOfHouseholdForm = () => {
	const dispatch = useDispatch();
	const [ famId, setFamId ] = useState(null);
	const history = useHistory();
	const apiError = useSelector((state) => state.apiError);
	const isLoading = useSelector((state) => state.isLoading);
	const [ formValues, setFormValues ] = useState(INITIAL_VALUES);
	const [ activeStep, setActiveStep ] = useState(0);
	const [ loading, setLoading ] = useState(false);
	let [ registeredAccount, setRegisteredAccount ] = useState(false);

	useEffect(() => {
		dispatch(clearErrors());
	}, []);

	const incrementStep = () => {
		setActiveStep(activeStep + 1);
	};

	const handleSubmit = () => {
		const member = { ...formValues };
		member.has_id = undefined;
		member.contacted_ywca = undefined;
		console.log(formValues);
		member.relationship_to_HoH = 'self';
		//  Changes yes/no values to booleans

		for (let key in member) {
			if (member[key] === 'yes') member[key] = true;

			if (member[key] === 'no') member[key] = false;
		}

		setLoading(true);

		axiosWithAuth()
			.post(`/api/guests/family/${famId}`, member)
			.then((res) => {
				history.push(`/guests/family/${famId}`);
			})
			.catch((e) => {
				alert(e.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleChange = (e) => {
		console.log(famId);
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value
		});
	};

	if (!registeredAccount) {
		return (
			<div className="add-member-container">
				<div className="forms-container">
					<FamilyAccountForm
						setFamId={setFamId}
						incrementStep={incrementStep}
						setFormValues={setFormValues}
						formValues={formValues}
						handleChange={handleChange}
						activeStep={activeStep}
						setRegisteredAccount={setRegisteredAccount}
					/>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="add-member-container">
				<div className="forms-container">
					<MultiStepForm
						incrementStep={incrementStep}
						setFormValues={setFormValues}
						formValues={formValues}
						handleChange={handleChange}
						activeStep={activeStep}
					/>
				</div>
				<div className="stepper">
					<Stepper
						steps={steps}
						activeStep={activeStep}
						setActiveStep={setActiveStep}
						handleSubmit={handleSubmit}
					/>
				</div>
			</div>
			{loading && <Loading />}
		</div>
	);
};

export default HeadOfHouseholdForm;

// const handleChange = (e) => {
//     const { name, value } = e.target

//     if (apiError) {
//         dispatch(clearErrors())
//     }

//     setFormValues({
//         ...formValues,
//         [name]: value
//     })
// }
// const [formValues, setFormValues] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//     pin: ''
// })

// }
