import React, { Component} from 'react'
import { connect } from 'react-redux'

class Messages extends Component {
    componentDidMount() {
        this.handleObserverForScroll()
    }

    componentDidUpdate() {
        this.handleObserverForScroll()
    }

    handleObserverForScroll = () => {
        let messagesList = document.querySelector('.message-list')
        let observer = new MutationObserver(this.scrollToBottom)
        let config = {childList: true}
        observer.observe(messagesList, config)
    }

    scrollToBottom = () => {
        let messagesList = document.querySelector('.message-list')
        messagesList.scrollTop = messagesList.scrollHeight
    }

    render() {
        return (
            <div className='sub-container message-list'>
                <div>Messages:</div>
                {this.props.messages
                    ? this.props.messages.map(message => 
                        <div>
                            {message.user === this.props.username 
                                ? 'Me' 
                                    : message.user}: {message.message}
                        </div>)
                            : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(Messages)