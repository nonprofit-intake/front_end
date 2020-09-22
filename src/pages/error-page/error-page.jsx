import React from 'react'
import { useSelector } from 'react-redux'

const ErrorPage = () => {
    const error = useSelector(state => state.apiError)
    return (
        <div>
            <h1>{error || "Looks like the application crashed"}</h1>
            <h1>Please contact a staff member for further assistance</h1>

            <img alt='' src='https://static.thenounproject.com/png/98571-200.png' style={{ width: '15rem' }}></img>
        </div>
    )
}

export default ErrorPage