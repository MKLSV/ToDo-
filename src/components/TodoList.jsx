import { TodoItem } from "./TodoItem"

export function TodoList({ todos, onRemoveTodo, onUpdateTodo }) {

    return <div className="todo-list">
        {todos.map(todo => (
            <div className={todo.isCompleted ? 'todo done' : 'todo'} key={todo._id}>
                <TodoItem todo={todo} onRemoveTodo={onRemoveTodo} onUpdateTodo={onUpdateTodo} />
            </div>
        ))}
    </div>


}
