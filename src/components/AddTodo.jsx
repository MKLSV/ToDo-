import React, { useState } from 'react'
import { saveTodo } from '../store/todo/todo.action.js'

export function AddTodo() {
    const [entity, setEntity] = useState('')

    function handleChange(e) {
        setEntity(e.target.value)
    }

    async function onSave() {
        if (entity.length === 0) return
            await saveTodo(entity)
        setEntity('');
    }

    return (
        <div className="add-container">
            <input type="text" placeholder='Новая задача...' onChange={(e) => handleChange(e)} value={entity} />
            <button onClick={onSave}>Добавить</button>
        </div>
    )
}