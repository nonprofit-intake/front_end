import React, { useState } from 'react';
import Stepper from './stepper/stepper';
import './add-member-form.scss';
import MultStepForm from './forms/index';
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth';
import { useHistory, useParams } from 'react-router-dom';
import ProgressBar from '../../components/progress-bar/progress-bar';
import faker from 'faker';

const INITIAL_VALUES = {};

const steps = [ 'Basic Information', 'Conditions/Health', 'School info', 'Submit' ];

const FamilyMemberForm = () => {
	const params = useParams();
	const history = useHistory();
	const [ loading, setLoading ] = useState(false);
	const [ formValues, setFormValues ] = useState(INITIAL_VALUES);
	const [ activeStep, setActiveStep ] = useState(0);

	const handleSubmit = () => {
		
		axiosWithAuth()
			.post(`/api/families/members/${params.fam_id}`, formValues)
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
