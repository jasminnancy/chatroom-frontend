import React from 'react'

const Users = (props) => {
    return (
        <div className='sub-container'>
            <div className='sub-header'>Users:</div>
            {props.users
                ? props.users.map(user => user)
                    : null}
        </div>
    )
}

export default Users