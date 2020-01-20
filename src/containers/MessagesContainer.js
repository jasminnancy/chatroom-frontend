import React from 'react'
import { connect } from 'react-redux'

import Messages from '../components/Messages'
import TextBox from '../components/TextBox'

const MessagesContainer = (props) => {
    return (
        <div>
            <Messages messages={props.messages} />
            <TextBox messages={props.messages} />
        </div>
    )
}

//gets messages in order to pass them to components for conditional rendering
const mapStateToProps = (state) => {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps)(MessagesContainer)