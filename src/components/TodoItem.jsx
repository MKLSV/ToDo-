import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "./DeleteModal";
import { removeTodo, saveTodo } from "../store/todo/todo.action";

export function TodoItem({ todo }) {
  // const { updateTodo, deleteTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleUpdate() {
    saveTodo({ ...todo, text: newText })
    setIsEditing(false);
  };

  function handleDelete() {
    removeTodo(todo._id);
    setIsModalOpen(false);
  };
  function handleChecked() {
    saveTodo({ ...todo, isCompleted: !todo.isCompleted })
  };


  return (
    <div className="todo-item">

      {isEditing ? (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={() => handleUpdate()}>Сохранить</button>
          <button onClick={() => setIsEditing(false)}>Отмена</button>
        </div>
      ) : (
        <div>
          <input type="checkbox" onChange={() => handleChecked(todo)} checked={todo.isCompleted ? "checked" : ''} />
          <span >{todo.text}</span>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
          <button onClick={() => setIsModalOpen(true)}>Удалить</button>
        </div>
      )}

      {isModalOpen && (
        <ConfirmDeleteModal
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
          text={todo.text}
        />
      )}
    </div>
  );
}

