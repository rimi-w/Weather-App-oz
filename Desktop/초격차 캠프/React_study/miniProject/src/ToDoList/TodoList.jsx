import { useRef } from "react";
import Todo from "./Todo";

function TodoList({ todoList, setTodoList }) {
    const inputRef = useRef()

    return (
        <>
            {todoList.map((todo) => (
                <Todo key={todo.id} todo={todo} setTodoList={setTodoList} inputRef={inputRef} />
            ))}
            <hr />
            <div className="add">
                <input ref={inputRef} />
                <button
                    className="addButton"
                    onClick={() => {
                        const newTodo = {
                            content: inputRef.current.value
                        };
                        fetch(`http://localhost:3001/todo`, {
                            method: `POST`,
                            body: JSON.stringify(newTodo)
                        })
                            .then(res => res.json())
                            .then((data) => {
                                setTodoList((prev) => [...prev, data]);
                            })
                        inputRef.current.value = ``;
                    }}
                >
                    추가하기
                </button>
            </div>
        </>
    );
}

export default TodoList;