import { useRef } from "react";
import { useState } from "react";


function Todo({ todo, setTodoList }) {

    return (
        <div className="listContainer">
            <div className="list">
                <input type="checkbox" id={todo.id} />
                <label for={todo.id}>
                    {todo.content}
                </label>
            </div>
            <div className="buttons">
                <Edit todo={todo} setTodoList={setTodoList} />
                <button
                    onClick={() => {
                        setTodoList((prev) => {
                            return prev.filter((el) => el.id !== todo.id);
                        });
                    }}
                >
                    삭제
                </button>
            </div>
        </div>
    );
}

function Edit({ todo, setTodoList }) {
    const [showInput, setShowInput] = useState(false);
    const editRef = useRef();

    const handleButtonClick = () => {
        showInput === false ? setShowInput(true) : setShowInput(false);
    };
    return (
        <>
            {showInput &&
                <input
                    ref={editRef}
                    className="editContent"
                />}

            <button
                className="editButton"
                onClick={() => {
                    handleButtonClick();
                    {
                        showInput &&
                            setTodoList((prev) =>
                                prev.map((el) =>
                                    el.id === todo.id ? { ...el, content: editRef.current.value } : el
                                )
                            );
                    }
                }}
            >
                수정
            </button>
        </>
    )
}

export default Todo;