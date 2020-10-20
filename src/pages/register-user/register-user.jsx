import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@material-ui/core'
import './register-user.scss'
import { clearErrors } from '../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ProgressBar from '../../components/progress-bar/progress-bar'
import { registerUser } from '../../redux/actions/staffActions'
import MultiStepForm from './forms/index'
import Stepper from '../add-member-form/stepper/stepper'
import Loading from '../../components/loading/loading'


import './register-user.scss'
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth'

const INITIAL_VALUES = {
    enroll_date: new Date,
    gender: 'male',
    first_name: 'asdasd',
    last_name: 'asdasda',
    email: 'fowler@gmail.com',
    dob: new Date,
    income_at_entry: 500,
    income_at_exit: 500,
    ethnicity: 'asdasddad',
    relationship_to_HoH: 'self',
    income_source: 'job',
    employer: 'mcdonalds',
    race: 'white',
    alcohol_abuse: 'no',
    developmental_disability: 'no',
    chronic_health_condition: 'no',
    substance_abuse: 'no',
    HIV_AIDS: 'no',
    mental_health_problem: 'no',
    physical_disability: 'no',
    last_grade_completed: '12',
    in_school: 'no',
    current_status: 'enrolled',
    connected_to_MVento: 'no',
    last_perm_address: '3211 east ave',
    zip: '16504',
    state: 'Pennsylvania',
    stayed_street_ES_or_SH_night_before: '',
    length_of_stay: '40d',
    stayed_7_or_less: 'no',
    stayed_90_or_less: 'no',
    times_homeless_last_3years: 20,
    homeless_start_date: new Date,
    total_months_homeless: 2,
    prior_address: 'test addy',
    covered_by_health_insurance: 'yes',
    date_of_first_stay: new Date,
    medicaid: true,
    medicare: true,
    CHIP: true,
    VAMS: true,
    COBRA: true,
    Private_employer: true,
    private: true,
    covered_by_state: true,
    state_funded: true,
    other: true,
    combined_childrens_health_insurance: true,
    domestic_violence: true,
    currently_fleeing: 'yes',
    when_dv_occured: new Date,
    foodstamps: true,
    cps_or_fps: true,
    rrh: true,
    housing_voucher: true,
    veteran_services: true,
    snap_assistance: true,
    last_4_digits_of_ssn: 1149,
    middle_name: '',
    current_age: 18,
    ssn: '114 554 889'
}

const steps = ['Create Family Account', 'Basic Information', 'Previous Locations/Healthcare', 'Disabilities/Mental Illness', 'Domestic Violence', 'Sign and Submit']

const RegisterUser = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const apiError = useSelector(state => state.apiError)
    const isLoading = useSelector(state => state.isLoading)
    const fam_id = useSelector(state => state.fam_id)

    useEffect(() => {
        dispatch(clearErrors())
    }, [])

    const [formValues, setFormValues] = useState(INITIAL_VALUES)
    const [activeStep, setActiveStep] = useState(4);
    const [loading, setLoading] = useState(false)

    const incrementStep = () => {
        setActiveStep(activeStep + 1)
    }

    const handleSubmit = () => {


        // refactor
        const member = { ...formValues }

        for (const key in formValues) {
            if (member[key] === true) {
                member[key] = 'yes'
            }

            else if (formValues[key] === false) {
                member[key] = 'no'
            }
        }

        setLoading(true)

        axiosWithAuth().post(`/api/guests/family/${fam_id}`, member).then(res => {
            history.push(`/guests/family/${fam_id}`)
        }).catch((e) => {
            alert(e.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleChange = (e) => {
        console.log(formValues)
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <div className='add-member-container'>
                <div className='forms-container'>
                    <MultiStepForm incrementStep={incrementStep} setFormValues={setFormValues} formValues={formValues} handleChange={handleChange} activeStep={activeStep}></MultiStepForm>
                </div>
                <div className='stepper'>
                    <Stepper steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} handleSubmit={handleSubmit} />
                </div>
            </div>
            {loading && <Loading />}
        </div>
    )
}


export default RegisterUser


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

