import { userService } from '../../services/user.service'
import { SET_USER } from './user.reducer'
import { store } from '../store'


export async function login(credentials) {

    try {
        const user = await userService.login(credentials)
        console.log('user', user)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot signup:', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('Cannot logout:', err)
        throw err

    }
}



