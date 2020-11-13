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
	email: faker.internet.email(),
	exit_destination: 'test',
	entire_episode_bednights: 3,
	first_name: faker.name.firstName(),
	last_name: faker.name.lastName(),
	middle_name: 'dev',
	relationship_to_HoH: 'Self',
	dob: '2020-11-13T05:00:00.000Z',
	pregnancy_due_date: '2020-11-13T05:00:00.000Z',
	is_pregnant: false,
	vet_status: false,
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
	covered_by_state: false,
	foodstamps: false,
	cps_or_fps: false,
	rrh: false,
	housing_voucher: false,
	veteran_services: false,
	snap_assistance: null,
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
	employment: false,
	covered_by_health_insurance: false,
	other_public: false,
	state_funded: false,
	indian_health_services: false,
	other: false,
	combined_childrens_health_insurance: false,
	medicaid: false,
	medicare: false,
	CHIP: false,
	VAMS: false,
	COBRA: false,
	Private_employer: false,
	private: false,
	private_individual: false,
	chronic_health_condition: false,
	alcohol_abuse: false,
	developmental_disability: false,
	substance_abuse: false,
	HIV_AIDS: false,
	mental_health_problem: false,
	physical_disability: null,
	documented_disabilites: 'test',
	indefinite_conditions: 'test',
	domestic_violence: false,
	currently_fleeing: false,
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
		// refactor

		const member = { ...formValues };

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
