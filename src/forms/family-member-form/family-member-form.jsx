import React, { useState } from 'react';
import Stepper from './stepper/stepper';
import './add-member-form.scss';
import MultStepForm from './forms/index';
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth';
import { useHistory, useParams } from 'react-router-dom';
import ProgressBar from '../../components/progress-bar/progress-bar';
import faker from 'faker';

const INITIAL_VALUES = {
	first_name: faker.name.firstName(),
	last_name: faker.name.lastName(),
	middle_name: '',
	current_age: 18,
	email: faker.internet.email(),
	dob: new Date(),
	income_at_entry: 500,
	income_at_exit: 300,
	ethnicity: 'white',
	relationship_to_HoH: 'son',
	income_source: 'job',
	employer: 'someone',
	race: 'race',
	alcohol_abuse: 'no',
	developmental_disability: 'no',
	chronic_health_condition: 'no',
	substance_abuse: 'no',
	HIV_AIDS: 'no',
	mental_health_problem: 'no',
	physical_disability: 'no',
	last_grade_completed: '',
	in_school: 'yes',
	current_status: 'no',
	connected_to_MVento: 'no',
	home_phone: '814-119-0987',
	school_name: 'some name',
	school_type: 'private',
	last_grade_completed: 12,
	attendance_status: 'irregular'
};

const steps = [ 'Basic Information', 'Conditions/Health', 'School info', 'Submit' ];

const FamilyMemberForm = () => {
	const params = useParams();
	const history = useHistory();
	const [ loading, setLoading ] = useState(false);
	const [ formValues, setFormValues ] = useState(INITIAL_VALUES);
	const [ activeStep, setActiveStep ] = useState(0);

	const handleSubmit = () => {
		console.log(formValues);
		axiosWithAuth()
			.post(`/api/guests/family/${params.fam_id}`, formValues)
			.then((res) => {
				history.push(`/guests/family/${params.fam_id}`);
			})
			.catch((e) => {
				alert(e.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const handleChange = (e) => {
		console.log(formValues);
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div>
			<div className="add-member-container">
				<div className="forms-container">
					<MultStepForm
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
			{loading && <ProgressBar />}
		</div>
	);
};

export default FamilyMemberForm;
