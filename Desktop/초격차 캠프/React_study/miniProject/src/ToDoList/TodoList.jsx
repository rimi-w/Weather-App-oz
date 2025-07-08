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
                        const newTodo = { id: Number(new Date()), content: inputRef.current.value };
                        const newTodoList = [...todoList, newTodo];
                        setTodoList(newTodoList);
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