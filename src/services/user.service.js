import { storageService } from './async-storage.service.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USERS = 'users'


export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    query,
    getById,
    getEmptyCredentials
}



function query() {
    return storageService.query(STORAGE_KEY_USERS)
}


async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY_USERS, userId)
    return user
}


async function login(userCred) {
    try {
        const users = await storageService.query(STORAGE_KEY_USERS);
        const user = users.find(user => user.username === userCred.username);
        if (user && user.password === userCred.password) {
            return saveLocalUser(user);
        }
        // Создаём объект ошибки для передачи корректного сообщения
        throw new Error('Неверный логин или пароль!');
    } catch (err) {
        // Дополнительно логируем ошибку, если нужно
        throw err; // Передаём ошибку дальше
    }
}
async function signup(userCred) {
    const user = await storageService.post(STORAGE_KEY_USERS, userCred)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}



function saveLocalUser(user) {
    console.log(user)
    user = user.username
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
    return {
        username: 'oren',
        password: 123456,
    }
}


