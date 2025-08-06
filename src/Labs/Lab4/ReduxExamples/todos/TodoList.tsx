/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import {useSelector} from "react-redux";
export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    return (
    <div id="wd-todo-list-redux" className="mt-4" style={{maxWidth: '40vw'}}>
        <h2 className="mb-3">Todo List</h2>
        <ListGroup>
            <TodoForm />
            {todos.map((todo: any) => (
                <TodoItem todo={todo} />
            ))}
        </ListGroup>
        <hr/>
    </div>
    );
}