import React, { Component } from 'react'
import { connect } from 'react-redux'

class TextBox extends Component {
    constructor() {
        super()

        this.state = {
            message: ''
        }
    }

    //updates state to reflect user input
    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    //handles form submit
    handleSubmit = (e, message) => {
        //prevents the page from refreshing
        e.preventDefault()

        //creates a message object so the message is aware of the user
        let messageObject = {
            user: this.props.username,
            message: message
        }

        //this came from dispatchStateToProps
        this.props.handleNewMessage(messageObject, this.props.messages)

        //sets messages back to an empty string to clear out text
        this.setState({ message: '' })
    }

    render () {
        return (
            <div className='sub-container'>
                <div>Message to send:</div>
                <form 
                    className='message' 
                    onSubmit={(e) => this.handleSubmit(e, this.state.message)}
                >
                    <input 
                        type='text' 
                        name='message' 
                        onChange={(e) => this.handleChange(e)} 
                        value={this.state.message}
                    />
                    <input type='submit' value='Send Message' />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.username
    }
}

//adds new messages to the end of the messages array then dispatches to the reducer
//messages array is passed in as a prop from MessagesContainer
const mapDispatchToProps = (dispatch) => {
    return {
        handleNewMessage: (message, messages) => {
            let newMessages = [...messages, message]
            dispatch({
                type: 'ADD_MESSAGE',
                payload: newMessages
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox)