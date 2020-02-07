import { combineReducers } from 'redux'

//initial store state
let initialState = {
    username: '',
    messages: [],
    users: []
}

//reducer for managing username
let usernameReducer = (state=initialState.username, action) => {
    switch(action.type) {
        case 'NEW_USERNAME':
            return action.payload
        default:
            return state
    }
}

//reducer for managing messages
let messagesReducer = (state=initialState.messages, action) => {
    switch(action.type) {
        case 'ADD_MESSAGE':
            return action.payload
        default:
            return state
    }
}

//reducer for managing users
let usersReducer = (state=initialState.users, action) => {
    switch(action.type) {
        case 'NEW_USER':
            return action.payload
        default:
            return state
    }
}

//combines all reducers into the root reducer
let rootReducer = combineReducers({
    username: usernameReducer,
    messages: messagesReducer,
    users: usersReducer
})

export default rootReducer