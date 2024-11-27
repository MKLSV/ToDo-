import '../assets/main.scss'

import { useSelector } from 'react-redux';
import { TodoList } from '../components/TodoList.jsx';
import { AddTodo } from '../components/AddTodo.jsx';
import { useEffect, useState } from 'react';
import { loadTodos, removeTodo, saveTodo } from '../store/todo/todo.action.js'
import AuthForm from './AuthForm.jsx';
import { logout } from '../store/user/user.action.js';

import { FiLogOut } from "react-icons/fi";

export default function TodoIndex() {

    const todos = useSelector((storeState) => storeState.todoModule.todos)
    const user = useSelector((storeState) => storeState.userModule.user)

    const [msg, setMsg] = useState('')

    useEffect(() => {
        loadTodos()
    }, [])


    async function handleRemoveTodo(todoId) {
        try {
            await removeTodo(todoId)
            setMsg('Задача успешно удалена')
            setTimeout(() => setMsg(''), 3000)
        } catch (err) {
            console.error('Ошибка при удалении задачи:', err)
        }
    };
    async function handleUpdateTodo(todo) {
        try {
            await saveTodo(todo)
            setMsg('Задача успешно изменена')
            setTimeout(() => setMsg(''), 3000)
        } catch (err) {
            console.error('Ошибка при удалении задачи:', err)
        }
    };

    return <div className="app">
        <header className='app-header'>
            <span className='title'>ToDo App</span>
            {user ? <div className="user">
                {/* <span>{user}</span> */}
                <FiLogOut onClick={() => logout()} className='logout-btn' />
            </div>
                : ''}
        </header>
        {user ?
            <div className="todo-app">
                <AddTodo />
                <TodoList todos={todos} onRemoveTodo={handleRemoveTodo} onUpdateTodo={handleUpdateTodo} />
            </div>
            : <AuthForm />}
        {msg ? <span className='message'>{msg}</span> : ''}


    </div>
}
