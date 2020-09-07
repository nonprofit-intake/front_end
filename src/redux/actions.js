import React from 'react'
import { axiosWithAuth } from '../utils/auth/axiosWithAuth'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export const login = (user, history) => async (dispatch) => {
    try {
        const res = await axiosWithAuth().post('/api/auth/login', user)

        const { token } = res.data

        const { user: currentUser } = res.data.payload

        dispatch({ type: "SET_CURRENT_USER", payload: currentUser })

        localStorage.setItem('token', token)

        dispatch({ type: 'LOGIN' })

        history.push('/')
    } catch (error) {
        const { message } = error.response.data

        dispatch({ type: 'ERROR', payload: message })
    }
}

export const register = (user, history) => async (dispatch) => {

    try {
        let res = await axiosWithAuth().post('/api/auth/register', user)
        let token = res.data.token

        localStorage.setItem('token', token)
        dispatch({ type: 'REGISTER' })
        history.push('/')
    } catch (error) {
        const { message } = error.response.data
        dispatch({ type: "ERROR", payload: message })
    }
}

export const logOut = (history) => (dispatch) => {
    localStorage.removeItem('token')
    history.push('/login')
    dispatch({ type: 'LOG_OUT' })
}

export const checkIfUserIsLoggedIn = () => dispatch => {
    const token = localStorage.getItem('token')
    if (token) {
        dispatch({ type: 'LOGIN' })
    }
}

export const setCurrentUser = (user) => {
    return { type: "SET_CURRENT_USER", payload: user }
}

export const clearErrors = () => {
    return { type: "CLEAR_ERRORS" }
}