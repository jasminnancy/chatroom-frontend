import React, { Component} from 'react'
import { connect } from 'react-redux'

class Messages extends Component {
    componentDidUpdate() {
        this.handleObserverForScroll()
    }

    handleObserverForScroll = () => {
        let messagesList = document.querySelector('.message-list')
        let observer = new MutationObserver(() => this.scrollToBottom(messagesList))
        let config = {childList: true}
        observer.observe(messagesList, config)
    }

    scrollToBottom = (messagesList) => {
        messagesList.scrollTop = messagesList.scrollHeight
    }

    render() {
        return (
            <div>
                <div className='sub-container sub-header'>Messages:</div>
                <div className='message-list'>
                    {this.props.messages
                        ? this.props.messages.map(message => 
                            <div>
                                {message.user === this.props.username 
                                    ? 'Me' 
                                        : message.user}: {message.message}
                            </div>)
                                : null}
                </div>
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