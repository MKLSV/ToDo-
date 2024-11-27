import React, { useState } from "react";
import ConfirmDeleteModal from "./DeleteModal";
import { saveTodo } from "../store/todo/todo.action";

import { FaRegEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDone } from "react-icons/md";

export function TodoItem({ todo, onRemoveTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [newText, setNewText] = useState(todo.text)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleUpdate() {
    onUpdateTodo({ ...todo, text: newText })
    setIsEditing(false)
  };

  function handleDelete() {
    onRemoveTodo(todo._id)
    setIsModalOpen(false)
  };
  function handleChecked() {
    saveTodo({ ...todo, isCompleted: !todo.isCompleted })
  };


  return (
    <div>

      {isEditing ? (
        <div className="todo-item">
          <div className="edit-item">
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <div className="btns">
              <MdDone onClick={() => handleUpdate()} />
              <TiDeleteOutline onClick={() => setIsEditing(false)} />
            </div>
          </div>
        </div>
      ) : (
        <div className="todo-item">
          <input className="custom-radio" type="radio" onChange={() => handleChecked(todo)} checked={todo.isCompleted ? "checked" : ''} />
          <div className="todo-container">
            <span >{todo.text}</span>
            <div className="btns">
              <FaRegEdit onClick={() => setIsEditing(true)} />
              <TiDeleteOutline onClick={() => setIsModalOpen(true)} />
            </div>
          </div>
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

