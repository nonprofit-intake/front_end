import React from 'react'
import { useParams } from 'react-router-dom'

const AddMember = () => {
    const params = useParams()
    return (
        <h1>User number {params.id}</h1>
    )
}

export default AddMember