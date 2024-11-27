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


function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}