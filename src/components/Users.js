import React from 'react'

const Users = (props) => {
    return (
        <div>
            <div className='sub-container sub-header'>Users:</div>
            <div className='user-list'>
                {props.users
                    ? props.users.map(user => <li className='usernames'>{user}</li>)
                        : null}
            </div>
        </div>
    )
}

export default Users