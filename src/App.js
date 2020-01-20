import React from 'react';
import './App.css';
import ChatContainer from './containers/ChatContainer'
import Header from './components/Header'

function App() {
  return (
    <div className='App'>
      <div className="chat-box">
        <Header />
        <ChatContainer />
      </div>
    </div>
  );
}

export default App;
