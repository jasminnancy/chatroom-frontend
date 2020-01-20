import React from 'react'
import MessagesContainer from './MessagesContainer'
import Users from '../components/Users'

const ChatContainer = (props) => {
    return (
        <div className='container messages'>
            <MessagesContainer />
            <Users users={props.users} />
        </div>
    )
}

export default ChatContainer