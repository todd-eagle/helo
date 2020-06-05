import axios from 'axios'

const initialState = {
   user: {},
   isLogdgedIn: false
}

const LOGIN_USER = 'LOGIN_USER'

export function login(user){
    return{
        type: LOGIN_USER, 
        payload: user
    }
}


export default function (state = initialState, action){
    switch (action.type) {
        case LOGIN_USER:
            return{...state, user: action.payload, isLogdgedIn: true}

        default:
            return initialState
    }
}
