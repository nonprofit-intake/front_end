import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../../components/loading/loading';
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth';
import './GuestInfoPage.scss';
import formatDate from '../../utils/helpers/formatDate';

const GuestInfoPage = () => {
	const history = useHistory();
	const [ loading, setLoading ] = useState(true);
	const [ guest, setGuest ] = useState(null);
	const params = useParams();

	useEffect(() => {
		axiosWithAuth()
			.get(`/api/guests/${params.id}`)
			.then((res) => {
				console.log(typeof res.data.payload.guest.dob);
				setGuest(res.data.payload.guest);
			})
			.catch((err) => {
				console.log(err);
				alert('fail');
				history.push('/guests');
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="container guest-container">
			<hr />
			<h1>basic client information</h1>
			<hr />

			<div className="client-info-container">
				<div className="client-info-field">
					<h1>First Name:</h1>
					<h2>{guest.first_name || 'Not Provided'}</h2>
				</div>
				<div className="client-info-field">
					<h1>Last Name:</h1>
					<h2>{guest.last_name || 'Not Provided'}</h2>
				</div>

				<div className="client-info-field" />
				<div className="client-info-field" />
				<div className="client-info-field">
					<h1>Middle Name:</h1>
					<h2>{guest.middle_name || 'Not Provided'}</h2>
				</div>
			</div>

			<hr />
			<h1>basic client demographics</h1>
			<hr />

			<div className="client-info-container">
				<div className="client-info-field">
					<h1>Birth Date:</h1>
					<h2>{formatDate(guest.dob)}</h2>
				</div>

				<div className="client-info-field">
					<h1>Client Age:</h1>
					<h2>{guest.current_age}</h2>
				</div>

				<div className="client-info-field">
					<h1>Ethnicity:</h1>
					<h2>{guest.ethnicity}</h2>
				</div>

				<div className="client-info-field">
					<h1>Race:</h1>
					<h2>{guest.race}</h2>
				</div>

				<div className="client-info-field">
					<h1>Gender:</h1>
					<h2>{guest.gender}</h2>
				</div>

				<div className="client-info-field">
					<h1>Preferred Language:</h1>
					<h2>{guest.preferred_language || 'Data not collected'}</h2>
				</div>

				<div className="client-info-field">
					<h1>Pregnancy Status:</h1>
					<h2>{guest.pregnancy_status || 'Data not collected'}</h2>
				</div>

				<div className="client-info-field">
					<h1>Sexual Orientation:</h1>
					<h2>{guest.sexual_orientation || 'Data not collected'}</h2>
				</div>

				<div className="client-info-field">
					<h1>Veteran Status:</h1>
					<h2>{guest.vet_status || 'Data not collected'}</h2>
				</div>

				<div className="client-info-field">
					<h1>Address:</h1>
					<h2>{guest.last_perm_address || 'Data not collected'}</h2>
				</div>

				<div className="client-info-field">
					<h1>City, State, Zipcode</h1>
					<h2>
						{`${guest.city || 'not collected'} - 
                        ${guest.state || 'not collected'} - 
                        ${guest.zip || 'not collected'}`}
					</h2>
				</div>

				<div className="client-info-field">
					<h1>Relationship to Head of Household:</h1>
					<h2>{guest.relationship_to_HoH || 'Data not collected'}</h2>
				</div>
			</div>

			<hr />
			<h1>HUD Program Enrollment</h1>
			<hr />

			<div className="client-info-container">
				<div className="client-info-field">
					<h1>Program</h1>
					<h2>{guest.project_name || 'Data not collected'}</h2>
				</div>
			</div>

			<hr />
			<h1>Universal Data Assessment</h1>
			<hr />

			<div className="client-info-container">
				{/* <div className="client-info-field">
					<h1>Assessment Date</h1>
					<h2>{guest.project_name || 'Data not collected'}</h2>
				</div>
				<div className="client-info-field">
					<h1>SOAR ID</h1>
					<h2>{guest.project_name || 'Data not collected'}</h2>
				</div> */}
				{/* <div className="client-info-field">
					<h1>Age At Enrollment</h1>
					<h2>{guest.age_at_enrollment}</h2>
				</div>
				<div className="client-info-field">
					<h1>Assessment Type</h1>
					<h2>{guest.project_name || 'Data not collected'}</h2>
				</div>
				<div className="client-info-field">
					<h1>Assesor</h1>
					<h2>{guest.project_name || 'Data not collected'}</h2>
				</div>
				<div className="client-info-field">
					<h1>Program</h1>
					<h2>{guest.project_name || 'Data not collected'}</h2>
				</div>
				<div className="client-info-field">
					<h1>Housing Status</h1>
					<h2>{guest.project_name || 'Data not collected'}</h2>
				</div>
				<div className="client-info-field">
					<h1>Disabling Condition</h1>
					<h2>{guest.disabling_cond_at_entry}</h2>
				</div>
				<div className="client-info-field">
					<h1>Client Location</h1>
					<h2>{guest.project_name || 'Data not collected'}</h2>
				</div>
				<div className="client-info-field">
					<h1>Prior Living Situtation</h1>
					<h2>{guest.living_situation || 'Data not collected'}</h2>
				</div> */}
				<div className="client-info-field">
					<h1>Length of stay in prior living situation</h1>
					<h2>{guest.length_of_stay || 'Data not collected'}</h2>
				</div>
				<div className="client-info-field">
					<h1>Approximate date homelessness started</h1>
					<h2>{formatDate(guest.homeless_start_date) || 'Data not collected'}</h2>
				</div>
				<div className="client-info-field">
					<h1>Times homeless in the last three years</h1>
					<h2>{guest.times_homeless_last_3years || 'Data not collected'}</h2>
				</div>
				<div className="client-info-field">
					<h1>Total number of months homeless in the past three years</h1>
					<h2>{guest.total_months_homeless || 'Data not collected'}</h2>
				</div>
				<hr />
				<div className="client-info-field">
					<h1>Medicaid</h1>
					<h2>{guest.medicaid}</h2>
				</div>
				<div className="client-info-field">
					<h1>Medicare</h1>
					<h2>{guest.medicare}</h2>
				</div>
				<div className="client-info-field">
					<h1>CHIP</h1>
					<h2>{guest.CHIP}</h2>
				</div>
				<div className="client-info-field">
					<h1>VA Medical Services</h1>
					<h2>{guest.VAMS}</h2>
				</div>
				<div className="client-info-field">
					<h1>Employer Provided Health Insurance</h1>
					<h2>{guest.Private_employer}</h2>
				</div>
				<div className="client-info-field">
					<h1>Private - Individual</h1>
					<h2>{guest.private_individual}</h2>
				</div>
				<div className="client-info-field">
					<h1>Health Insurance Obtained Through COBRA</h1>
					<h2>{guest.COBRA}</h2>
				</div>
				<div className="client-info-field">
					<h1>Private Pay Health Insurance</h1>
					<h2>{guest.private}</h2>
				</div>
				<div className="client-info-field">
					<h1>State Health Insurance for Adults</h1>
					<h2>{guest.state_funded}</h2>
				</div>

				<div className="client-info-field">
					<h1>Indian Health Services Program (IHS)</h1>
					<h2>{guest.indian_health_services}</h2>
				</div>
				<div className="client-info-field">
					<h1>Other</h1>
					<h2>{guest.other}</h2>
				</div>
				<div className="client-info-field">
					<h1>Other Public</h1>
					<h2>{guest.other_public}</h2>
				</div>

				<div className="client-info-field">
					<h1>Combined Children's Health Insurance / Medicaid Program</h1>
					<h2>{guest.combined_childrens_health_insurance}</h2>
				</div>
			</div>

			<hr />
			<h1>Barriers</h1>
			<hr />

			<div className="client-info-container">
				<div className="client-info-field">
					<h1>Alcohol Abuse</h1>
					<h2>{guest.alcohol_abuse}</h2>
				</div>
				<div className="client-info-field">
					<h1>Developmental Disability</h1>
					<h2>{guest.developmental_disability}</h2>
				</div>
				<div className="client-info-field">
					<h1>Chronic Health</h1>
					<h2>{guest.chronic_health_condition}</h2>
				</div>
				<div className="client-info-field">
					<h1>Drug Abuse</h1>
					<h2>{guest.substance_abuse}</h2>
				</div>
				<div className="client-info-field">
					<h1>HIV/AIDS</h1>
					<h2>{guest.HIV_AIDS}</h2>
				</div>
				<div className="client-info-field">
					<h1>Mental Illness</h1>
					<h2>{guest.mental_health_problem}</h2>
				</div>
				<div className="client-info-field">
					<h1>Physical Disability</h1>
					<h2>{guest.physical_disability}</h2>
				</div>
			</div>

			<hr />
			<h1>Domestic Violence Assessment</h1>
			<hr />

			<div className="client-info-container">
				<div className="client-info-field">
					<h1>DV Experience</h1>
					<h2>{guest.domestic_violence}</h2>
				</div>
				<div className="client-info-field">
					<h1>Date when DV occured</h1>
					<h2>{formatDate(guest.when_dv_occured)}</h2>
				</div>
				<div className="client-info-field">
					<h1>currently_fleeing</h1>
					<h2>{guest.currently_fleeing}</h2>
				</div>
				<div className="client-info-field">
					<h1>DV Experience</h1>
					<h2>{guest.domestic_violence}</h2>
				</div>
			</div>
			<hr />
			<h1>Child Education Assessment</h1>
			<hr />
			<div className="client-info-container">
				<div className="client-info-field">
					<h1>Highest Grade Completed</h1>
					<h2>{guest.last_grade_completed}</h2>
				</div>
				<div className="client-info-field">
					<h1>Current Enrollment Status</h1>
					<h2>{guest.current_status}</h2>
				</div>
				<div className="client-info-field">
					<h1>Attendance Status</h1>
					<h2>{guest.attendance_status}</h2>
				</div>
			</div>
			{/* <div className="client-info-container">
				<div className="client-info-field">
					<h1>Current Living Situation</h1>
					<h2>{guest.living_situation}</h2>
				</div>
			</div> */}
		</div>
	);
};

export default GuestInfoPage;
