// import axios from 'axios'

const initialState = {
   user: {},
   isLogdgedIn: false
}

const LOGIN_USER = 'LOGIN_USER'

export const login = (user) => {
    return {
        type: LOGIN_USER, 
        payload: user
    }
}

export default function (state = initialState, action){
    switch (action.type) {
        case LOGIN_USER:
            console.log('Action.payload for LOGIN_USER',action.payload)
            return{...state, user: action.payload, isLogdgedIn: true}
        default:
            return initialState
    }
}
