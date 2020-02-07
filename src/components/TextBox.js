import React, { Component } from 'react'
import { connect } from 'react-redux'

class TextBox extends Component {
    constructor() {
        super()

        this.state = {
            message: ''
        }
    }

    socket = new WebSocket('ws://localhost:3030')

    componentDidMount() {
        this.socket.onopen = () => {
            //sends username to server for welcome message
            this.socket.send(JSON.stringify(this.props.username))
        }

        this.socket.onmessage = (e) => {
            const message = JSON.parse(e.data)

            //this came from dispatchStateToProps
            this.props.handleNewMessage(message, this.props.messages, this.props.users)
        }

        this.socket.onclose = () => {
            //attempts to reconnect to server if disconnected on error            
            this.setState({
                socket: new WebSocket('ws://localhost:3030'),
            })

            this.props.handleClose(this.props.users, this.props.username)
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

        //send message to the WebSocket
        this.socket.send(JSON.stringify(messageObject))

        //this came from dispatchStateToProps
        this.props.handleNewMessage(messageObject, this.props.messages, this.props.users)

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
        username: state.username,
        users: state.users,
        messages: state.messages
    }
}

//checks to see if the message is a new user joining
//adds new message to end of messages array then dispatches
//messages array is passed in as a prop from MessagesContainer
const mapDispatchToProps = (dispatch) => {
    return {
        handleNewMessage: (message, messages, users) => {
            let newMessages

            if (message.user) {
                newMessages = [...messages, message]

                if (users.filter(u => u === message.user) < 1) {
                    let newUsers = [...users, message.user]

                    dispatch({
                        type: 'NEW_USER',
                        payload: newUsers
                    })
                }
            } else {
                newMessages = [
                    ...messages, 
                    {user: message, 
                    message: `just joined the chat`}
                ]

                let newUsers = [...users, message]
                
                dispatch({
                    type: 'NEW_USER',
                    payload: newUsers
                })
            }

            dispatch({
                type: 'ADD_MESSAGE',
                payload: newMessages
            })
        },

        handleClose: (users, user) => {
            let remainingUsers = users.filter(u => u.user !== user.user)

            dispatch({
                type: 'NEW_USER',
                payload: remainingUsers
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox)