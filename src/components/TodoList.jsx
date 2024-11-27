import { TodoItem } from "./TodoItem"

export function TodoList({ todos }) {

    return <div className="todo-list">
        {todos.map(todo => (
            <div className={todo.isCompleted ? 'todo done' : 'todo'} key={todo._id}>
                <TodoItem todo={todo} />
            </div>
        ))}
    </div>


}

// import { saveTodo } from "../store/todo/todo.action"
// import TodoItem from "./SelectedTodo"

// export function TodoList({ todos, setSlectedTodo }) {

//     function handleChecked(selectedTodo) {
//         saveTodo({ ...selectedTodo, isCompleted: !selectedTodo.isCompleted })
//     };

//     return <div className="todo-list">
//         {todos.map(todo => (
//             <div className={todo.isCompleted ? 'todo done' : 'todo'} key={todo._id}>
//                 <input type="checkbox" onClick={() => handleChecked(todo)} checked={todo.isCompleted ? "checked" : ''} />
//                 <span onClick={() => setSlectedTodo(todo)}>{todo.text}</span>
//             </div>
//         ))}
//     </div>


// }