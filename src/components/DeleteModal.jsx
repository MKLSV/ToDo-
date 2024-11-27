import React from "react";

function ConfirmDeleteModal({ onConfirm, onCancel, text }) {
  return (
    <div className="modal">
      <p>Вы уверены, что хотите удалить задачу '{text}'?</p>
      <button onClick={onConfirm}>Да</button>
      <button onClick={onCancel}>Нет</button>
    </div>
  );
}

export default ConfirmDeleteModal;
