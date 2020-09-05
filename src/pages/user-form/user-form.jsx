import React, { useState } from 'react'
import FormList from '../../components/form-list/form-list'
import FirstForm from '../../components/user-info-forms/first-form'
import SecondForm from '../../components/user-info-forms/second-form'
import ThirdForm from '../../components/user-info-forms/third-form'
import FourthForm from '../../components/user-info-forms/fourth-form'

const UserForm = () => {
    const [multiStep, setMultiStep] = useState(0)

    const stepForward = () => {
        setMultiStep(multiStep + 1)
    }

    const stepBack = () => {
        setMultiStep(multiStep - 1)
    }

    switch (multiStep) {
        case 0:
            return <FormList />
        case 1:
            return <FirstForm></FirstForm>
        case 2:
            return <SecondForm></SecondForm>
        case 3:
            return <ThirdForm></ThirdForm>
        case 4:
            return <FourthForm></FourthForm>
    }
}

export default UserForm