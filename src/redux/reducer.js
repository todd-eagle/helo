// import axios from 'axios'

const initialState = {
   user: {},
   isLogdgedIn: false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export const login = (user) => {
    return {
        type: LOGIN_USER, 
        payload: user
    }
}

export const logout = () => {
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export default function (state = initialState, action){
    switch (action.type) {
        case LOGIN_USER:
            return{...state, user: action.payload, isLogdgedIn: true}
        case LOGOUT_USER:
            return{...state, ...action.payload}
        default:
            return initialState

    }
}
