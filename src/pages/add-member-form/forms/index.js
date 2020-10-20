import React from 'react'

import First from './first'
import Second from './second'
import Third from './third'
import Fourth from './fourth'
import Fifth from './fifth'
import Sixth from './sixth'


export default function ({ setFormValues, activeStep, handleSubmit, handleChange, formValues }) {
    switch (activeStep) {
        case 0:
            return <First setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} />
        case 1:
            return <Second formValues={formValues} setFormValues={setFormValues} handleChange={handleChange} />
        case 2:
            return <Third formValues={formValues} handleChange={handleChange} />
        case 3:
            return <Fourth formValues={formValues} handleChange={handleChange} />
        case 4:
            return <Fifth formValues={formValues} handleChange={handleChange} />
        case 5:
            return <Sixth formValues={formValues} handleChange={handleChange} />
    }
}