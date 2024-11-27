import { storageService } from "./async-storage.service"
import demoData from '../data.json'

const STORAGE_KEY = 'todos'

export const todoService = {
    query,
    // getById,
    save,
    addTodo,
    remove,
    getEmptyTodo,
    // getDefaultFilter,
    // getLabels,
    // addToyMsg,
    // removeToyMsg,
    // getEmptyMsg

}

// function query(filterBy = getDefaultFilter()) {
//     const queryParams = 
//     `?name=${filterBy.name}&inStock=${filterBy.inStock}&label=${filterBy.label}&sortBy=${filterBy.sortBy}&desc=${filterBy.desc}`
//     return httpService.get(BASE_URL + queryParams)
// }

async function query() {
    let data = await storageService.query(STORAGE_KEY)
    console.log(data.length)
    if (data.length === 0) {
        storageService.save(STORAGE_KEY, demoData)
        return demoData
    }
    return data
}

async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY, userId)
    return user
}

async function updatedTodo(todoToUpdate) {
    const todo = await storageService.put(STORAGE_KEY, todoToUpdate)
    return todo
}

async function remove(todoId) {
    const todo = await storageService.remove(STORAGE_KEY, todoId)
    return todo
}


 function addTodo(todo) {
    let todoToSend = getEmptyTodo(todo)
    storageService.post(STORAGE_KEY, todoToSend)
    return todoToSend
}

async function save(todo) {
    return (todo._id) ? updatedTodo(todo) : addTodo(todo)
}
function getEmptyTodo(todo) {
    return {
        "_id" : _makeId(),
        "text": todo,
        "isCompleted": false,
        "createdAt": Date.now()
    }
}

// function getEmptyMsg() {
//     return {
//         id: utilService.makeId(),
//         txt: ''
//     }
// }

// function getLabels() {
//     return [
//         "On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"
//     ]
// }

// async function addToyMsg(toyId, msg) {
//     try {
//         const savedMsg = await httpService.post(`toy/${toyId}/msg`, { msg })
//         return savedMsg
//     } catch (e) {
//         /// do error handling
//     }
// }

// async function removeToyMsg(toyId, msgId) {
//     await httpService.delete(`toy/${toyId}/msg/${msgId}`)

// }


function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}