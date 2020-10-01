import React from 'react'
import Stepper from './stepper/stepper'
import './add-member-form.scss'

const AddMemberForm = () => {

    return (
        <div className='container'>
            <div className='stepper'>
                <Stepper />
            </div>
        </div>
    )
}

export default AddMemberForm