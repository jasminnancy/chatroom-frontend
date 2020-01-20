import { combineReducers } from 'redux'

//initial store state
let initialState = {
    messages: [],
    users: []
}

//reducer for managing messages
let messagesReducer = (state=initialState.messages, action) => {
    switch(action.type) {
        default:
            return state
    }
}

//reducer for managing users
let usersReducer = (state=initialState.users, action) => {
    switch(action.type) {
        default:
            return state
    }
}

//combines all reducers into the root reducer
let rootReducer = combineReducers({
    messages: messagesReducer,
    users: usersReducer
})

export default rootReducer