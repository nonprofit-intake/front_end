import React from 'react';
import FamilyAccountForm from './family-account-form';
import IdentificationForm from './identification-form';
import BasicInformationForm from './basic-information-form';
import PreviousLocationsForm from './previous-locations-form';
import DisabilitiesForm from './disabilities-form';
import DomesticViolenceForm from './domestic-violence-form';
import SubmitForm from './submit-form';

export default function({ incrementStep, setFormValues, activeStep, handleSubmit, handleChange, formValues }) {
	switch (activeStep) {
		case 0:
			return <BasicInformationForm setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} />;
		case 1:
			return <PreviousLocationsForm setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} />;
		case 2:
			return <DisabilitiesForm setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} />;
		case 3:
			return <DomesticViolenceForm setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} />;
		case 4:
			return <SubmitForm setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} />;
	}
}
