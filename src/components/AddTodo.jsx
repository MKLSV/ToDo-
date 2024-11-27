import React, { useState } from 'react'
import { todoService } from '../services/todo.service'
import { saveTodo } from '../store/todo/todo.action.js'

export  function AddTodo() {
    const [entity, setEntity] = useState('')

    function handleChange(e) {
        setEntity(e.target.value)
    }

    async function onSave() {
        // let todoToSave = todoService.getEmptyTodo(entity);
        // console.log(todoToSave)
        await saveTodo(entity)
        setEntity('');
    }

    return (
        <div className="add-container">
            <input type="text" placeholder='Новая задача...' onChange={(e) => handleChange(e)} value={entity} />
            <button onClick={onSave}>Save</button>
        </div>
    )
}