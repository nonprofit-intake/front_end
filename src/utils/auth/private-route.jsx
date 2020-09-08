import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest} render={() => {
        if (localStorage.getItem('token')) {
            return <Component></Component>
        } else {
            return <Redirect to='/login'></Redirect>
        }
    }} />
}

export default PrivateRoute