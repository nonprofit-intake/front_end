import React from 'react'
import { axiosWithAuth } from '../utils/auth/axiosWithAuth'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

export const login = (user, history) => async (dispatch) => {
    try {
        const res = await axiosWithAuth().post('/api/auth/login', user)

        const { token } = res.data

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

export const fetchAllUsers = () => async dispatch => {
    try {
        let res = await axiosWithAuth().get('/api/users')
        const { users } = res.data.payload
        dispatch({ type: "SET_USERS", payload: users })
    } catch (error) {
        console.log(error)
    }

}

export const updateUser = (updatedValues, userId, history) => async dispatch => {
    try {
        await axiosWithAuth().patch(`/api/users/${userId}`, updatedValues)
        history.push('/')
    } catch (error) {
        console.log(error)
    }
}


export const deleteUser = (userId) => async dispatch => {
    try {
        await axiosWithAuth().delete(`/api/users/${userId}`)
        dispatch({ type: "DELETE_USER", payload: { id: userId } })
    } catch (error) {
        console.log(error)
    }
}
