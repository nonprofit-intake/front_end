import generatePassword from '../../utils/helpers/generatePassword'
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth'

export const registerUser = (user, history) => async dispatch => {
    console.log(user)
    dispatch({ type: "IS_LOADING" })
    user.role = 'guest'
    user.password = generatePassword(user.first_name, user.last_name, user.pin)

    dispatch({ type: "IS_LOADING" })

    try {
        let res = await axiosWithAuth().post('/api/auth/staff/register', user)
        console.log(res)
        let token = res.data.token
        console.log(token)
        let { unique_id: fam_id } = res.data.payload.user
        console.log(fam_id)
        dispatch({ type: 'REGISTER_USER' })
        history.push(`/guests/family/${fam_id}`)
        dispatch({ type: "IS_NOT_LOADING" })
    } catch (error) {
        let message
        if (error.message && error.message == 'Network Error') {
            history.push('/error-page')
            dispatch({ type: "ERROR", payload: error.message })
            return
        }
        if (error.response?.status == 429) {
            message = 'too many login attempts. Please contact a staff member for further assistance'
        } else {
            message = error.response?.data?.message
        }

        dispatch({ type: 'ERROR', payload: message })
    }
}

export const addMembers = (guest, history) => async dispatch => {
    console.log(guest)
    console.log('Add member called')
}

