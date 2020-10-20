import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/loading/loading'
import { axiosWithAuth } from '../../utils/auth/axiosWithAuth'
import './GuestInfoPage.scss'

const GuestInfoPage = () => {
    const [loading, setLoading] = useState(true)
    const [guest, setGuest] = useState(null)
    const params = useParams()

    useEffect(() => {
        axiosWithAuth().get(`/api/guests/${params.id}`)
            .then((res) => {
                console.log(res.data)
                setGuest(res.data.payload.guest)
            }).catch(() => {
                alert('fail')
            }).finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <div className='container guest-container'>

            <hr />
            <h1>basic client information</h1>
            <hr />

            <div className='client-info-field'>
                <h1>First Name</h1>
                <h2>{guest.first_name}</h2>
            </div>
            <div className="client-info-field">
                <h1>Last Name</h1>
                <h2>{guest.last_name}</h2>
            </div>

            <div className="client-info-field"></div>
            <div className="client-info-field"></div>
            <div className="client-info-field">
                <h1>Middle Name</h1>
                <h2>{guest.middle_name}</h2>
            </div>
            <div className="client-info-field">
                <h1>SSN</h1>
                <h2>{guest.ssn}</h2>
            </div>

            {/*<div className="client-info-field">
                <h1>Ethnicity</h1>
                <h2>{guest.ethnicity}</h2>
            </div>

            <div className="client-info-field">
                <h1>Race</h1>
                <h2>{guest.race}</h2>
            </div>

            <div className="client-info-field">
                <h1>Gender</h1>
                <h2>{guest.gender}</h2>
            </div>
{/*  */}
            {/* 
            <h1>Prefered Language</h1>
            <h2>{guest.native_language}</h2>

            <h1>Pregnacy Status</h1>
            <h2>{guest.pregnacy_status}</h2>

            <h1>Sexual Orientation</h1>
            <h2>{guest.sexual_orientation}</h2>

            <h1>Veteran Status</h1>
            <h2>{guest.is_veteran}</h2> */}

            <hr />
            <h1>basic client demographics</h1>
            <hr />

            <div className='client-info-field'>
                <h1>Date of birth</h1>
                <h2>{guest.dob}</h2>
            </div>

            <div className="client-info-field">
                <h1>Client Age</h1>
                <h2>{guest.current_age}</h2>
            </div>

            <div className="client-info-field">
                <h1>Ethnicity</h1>
                <h2>{guest.ethnicity}</h2>
            </div>

            <div className="client-info-field">
                <h1>Race</h1>
                <h2>{guest.race}</h2>
            </div>

            <div className="client-info-field">
                <h1>Gender</h1>
                <h2>{guest.gender}</h2>
            </div>

            <hr />
            <h1>Disabling Conditions</h1>
            <hr />

        </div>
    )
}

export default GuestInfoPage