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
import { returnFamilyValues, returnGuestValues } from '../../utils/helpers/parseFormValues';

const INITIAL_VALUES = {
	project_name: 'FPS--ES--Open Doors',
	email: faker.internet.email(),
	exit_destination: 'test',
	entire_episode_bednights: 3,
	first_name: faker.name.firstName(),
	last_name: faker.name.lastName(),
	middle_name: 'dev',
	relationship_to_HoH: 'Self',
	dob: '2020-11-13T05:00:00.000Z',
	pregnancy_due_date: '2020-11-13T05:00:00.000Z',
	is_pregnant: true,
	vet_status: true,
	age_at_enrollment: 34,
	current_age: 36,
	ethnicity: 'test',
	race: 'test',
	gender: 'test',
	preferred_language: 'test',
	sexual_orientation: 'test',
	home_phone: 'test',
	work_phone: 'test',
	personal_phone_number: 'test',
	alternative_phone_number: 'test',
	emergency_contact_name: 'test',
	emergency_contact_number: 'test',
	identification_type: 'test',
	identification_value: 'test',
	last_4_digits_of_ssn: '1234',
	covered_by_state: true,
	foodstamps: true,
	cps_or_fps: true,
	rrh: true,
	housing_voucher: true,
	veteran_services: true,
	snap_assistance: true,
	program_type: 'FPS--ES--Open Doors',
	employer: 'test',
	income_source: 'test',
	income_at_entry: 2000,
	income_at_update: 2500,
	income_at_exit: 4000,
	last_perm_address: 'test',
	city: faker.address.city(),
	state: faker.address.state(),
	zip: faker.address.zipCode(),
	homeless_start_date: '2020-11-13T05:00:00.000Z',
	housing_status: 'test',
	living_situation: 'test',
	length_of_stay: 'test',
	times_homeless_last_3years: 'test',
	total_months_homeless: 'test',
	employment: true,
	covered_by_health_insurance: true,
	other_public: true,
	state_funded: true,
	indian_health_services: true,
	other: true,
	combined_childrens_health_insurance: true,
	medicaid: true,
	medicare: true,
	CHIP: true,
	VAMS: true,
	COBRA: true,
	Private_employer: true,
	private: true,
	private_individual: true,
	chronic_health_condition: true,
	alcohol_abuse: true,
	developmental_disability: true,
	substance_abuse: true,
	HIV_AIDS: true,
	mental_health_problem: true,
	physical_disability: null,
	documented_disabilites: 'test',
	indefinite_conditions: 'test',
	domestic_violence: true,
	currently_fleeing: true,
	when_dv_occured: '6 months to a year ago',
	in_school: null,
	connected_to_MVento: null,
	last_grade_completed: '12th grade',
	school_status: 'Enrolled',
	school_type: 'Public',
	school_name: 'Lincoln',
	reason_for_not_being_enrolled: 'test',
	vehicle_make: 'test',
	model: 'test',
	year: 'test',
	color: 'test',
	liscense: 'test'
};

const steps = [
	'Basic Information',
	'Previous Locations/Healthcare',
	'Disabilities/Mental Illness',
	'DV/Pregnancy',
	'Sign and Submit'
];

const HeadOfHouseholdForm = () => {
	const dispatch = useDispatch();
	const [ userId, setUserId ] = useState(null);
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

	const handleSubmit = async () => {
		let family = returnFamilyValues(formValues);

		let guest = returnGuestValues(formValues);

		//  Changes yes/no values to booleans

		for (let key in family) {
			if (family[key] === 'yes') family[key] = true;

			if (family[key] === 'no') family[key] = false;
		}

		for (let key in guest) {
			if (guest[key] === 'yes') guest[key] = true;

			if (guest[key] === 'no') guest[key] = false;
		}

		setLoading(true);

		try {
			let res = await axiosWithAuth().post('/api/v1/families', family);

			const { id: fam_id } = res.data.payload.family;

			await axiosWithAuth().post(`/api/v1/families/${fam_id}/members`, guest);

			await axiosWithAuth().patch(`/api/v1/users/${userId}`, { fam_id });

			history.push(`/family/${fam_id}/members`);
		} catch (error) {
			console.log(error);
			alert('error');
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
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
						setUserId={setUserId}
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
