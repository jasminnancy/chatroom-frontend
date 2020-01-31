import React, { Component } from 'react';
import { connect } from 'react-redux'

import './App.css';

import ChatContainer from './containers/ChatContainer'
import Header from './components/Header'

class App extends Component {
  componentDidMount() {
    //generates a random user number
    let random = Math.floor(Math.random() * 1000) + 1
    let username = 'NewUser' + random

    //passes users array from props and the generated username
    this.props.handleUsername(username, this.props.users)

    this.openWebSocket()
  }

  openWebSocket = () => {
    const socket = new WebSocket('ws://localhost:3000')
    // socket.onopen = () => socket.send('Gotta get this working')
    // socket.onmessage = (e) => console.log(e.data)
  }

  render() {
    return (
      <div className='App'>
        <div className="chat-box">
          <Header />
          <ChatContainer users={this.props.users}/>
        </div>
      </div>
    );
  }
}

//maps users state from store to props
const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

//dispatches the auto-generated username
//dispatches the new user to users array
const mapDispatchToProps = (dispatch) => {
  return {
    handleUsername: (username, users) => {
      let newUsers = [...users, username]

      dispatch({
        type: 'NEW_USER',
        payload: newUsers
      })

      dispatch({
        type: 'GENERATE_USERNAME',
        payload: username
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
