import { combineReducers, legacy_createStore as createStore } from 'redux'

import { todoReducer } from './todo/todo.reducer.js'
import { userReducer } from "./user/user.reducer"


const rootReducer = combineReducers({
    todoModule: todoReducer,
    userModule: userReducer
})

export const store = createStore(rootReducer)