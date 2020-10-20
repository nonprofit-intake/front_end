import React from 'react'

import First from './first'
import Second from './second'
import Third from './third'
import Fourth from './fourth'
import Fifth from './fifth'
import Sixth from './sixth'

export default function ({ incrementStep, setFormValues, activeStep, handleSubmit, handleChange, formValues }) {
    switch (activeStep) {
        case 0:
            return <First incrementStep={incrementStep} setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} />
        case 1:
            return <Second setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} />
        case 2:
            return <Third setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} />
        case 3:
            return <Fourth setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} />
        case 4:
            return <Fifth setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} />
        case 5:
            return <Sixth setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} />
    }
}