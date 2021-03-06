import generatePassword from '../../utils/helpers/generatePassword'
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth'

export const registerUser = (user, history, incrementStep) => async dispatch => {
    console.log(user)
    dispatch({ type: "IS_LOADING" })
    user.role = 'guest'
    user.password = generatePassword(user.first_name, user.last_name, user.pin)

    dispatch({ type: "IS_LOADING" })

    try {
        let res = await axiosWithAuth().post('/api/auth/staff/register', user)
       
        let token = res.data.token
        console.log(token)
        let { unique_id: fam_id } = res.data.payload.user
        
        dispatch({ type: 'REGISTER_USER_AS_GUEST', payload: fam_id })
        dispatch({ type: "IS_NOT_LOADING" })
        incrementStep()
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

export const setUnauthorizedUsers = (history) => async dispatch => {
    try {
        let res = await axiosWithAuth().get('/api/v1/users', { params: { role: 'pending' } }).then(res => res.data)
        const { users } = res.payload
        dispatch({ type: "SET_UNAUTHORIZED_USERS", payload: users })

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

export const declineUser = (id, history) => async dispatch => {
    dispatch({ type: "IS_LOADING" })
    try {
        await axiosWithAuth().delete(`/api/v1/users/${id}`)
        dispatch({ type: "DECLINE_USER", payload: { id } })
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

export const acceptUser = (id, history) => async dispatch => {

    dispatch({ type: "IS_LOADING" })
    try {
        await axiosWithAuth().patch(`/api/v1/users/${id}`, { role: 'staff' })
        dispatch({ type: "ACCEPT_USER", payload: { id } })
    } catch (error) {
        alert('error accepting user')
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

