import React from 'react'
import MessagesContainer from './MessagesContainer'
import Users from '../components/Users'

const ChatContainer = () => {
    return (
        <div className='container'>
            <MessagesContainer />
            <Users />
        </div>
    )
}

export default ChatContainer