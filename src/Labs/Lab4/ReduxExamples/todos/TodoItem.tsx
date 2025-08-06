import {Button, ListGroup} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: { id: string; title: string }; }) {
    const dispatch = useDispatch();
    return (
        <ListGroup.Item key={todo.id} className="d-flex align-items-center justify-content-between p-3">
            <span className="flex-grow-1 me-3">{todo.title}</span>
            <div className="d-flex gap-2">
                <Button
                    variant="primary"
                    className="px-3"
                    onClick={() => dispatch(setTodo(todo))}
                    id="wd-set-todo-click">
                    Edit
                </Button>
                <Button
                    variant="danger"
                    className="px-3"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    id="wd-delete-todo-click">
                    Delete
                </Button>
            </div>
        </ListGroup.Item>
    );
}

