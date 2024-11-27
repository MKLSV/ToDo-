import '../assets/main.scss'

import { useSelector } from 'react-redux';
import { TodoList } from './TodoList.jsx';
import { AddTodo } from './AddTodo.jsx';
import { useEffect, useState } from 'react';
import { loadTodos } from '../store/todo/todo.action.js'
import AuthForm from './AuthForm.jsx';
import { logout } from '../store/user/user.action.js';

export default function TodoIndex() {

    const todos = useSelector((storeState) => storeState.todoModule.todos)
    const user = useSelector((storeState) => storeState.userModule.user)

    useEffect(() => {
        loadTodos()
    }, [])


    return <div className="app">
        <header>
            <h1>ToDo App</h1>
            {user ? <div className="user">
                <span>{user}</span>
                <button onClick={() => logout()}>logout</button>
            </div>
                : ''}
        </header>
        {user ?
            <div className="todo-app">
                <AddTodo />
                <TodoList todos={todos} />
            </div>
            : <AuthForm />}
    </div>
}
