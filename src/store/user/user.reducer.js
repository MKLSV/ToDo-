import { userService } from "../../services/user.service.js"


export const SET_USER = 'SET_USER'
export const GET_USER = 'GET_USER'



const initialState = {
    user: userService.getLoggedinUser()
}


export function userReducer(state = initialState, action) {

    switch (action.type) {

        // USER
        case SET_USER:
            return { ...state, user: action.user }

        default:
            return { ...state }
    }
}