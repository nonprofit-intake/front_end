import React from 'react'
import User from '../user/user'
import './user-list.scss'


const UserList = ({ users }) => {
    return (
        <div className='generic-container'>
            <div className='users-container'>
                {
                    users.map(user => {
                        const { name, username, id, role } = user
                        return (
                            <User
                                id={id}
                                key={id}
                                name={name}
                                username={username}
                                role={role}>
                            </User>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UserList