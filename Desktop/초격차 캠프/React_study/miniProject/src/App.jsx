import { useState } from "react";
import TodoList from "./ToDoList/TodoList";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: new Date(), content: "Plan your day" },
  ]);


  return (
    <>
      <h1> 🗒️ To do List </h1>
      <div className="container">
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </div>
    </>
  );
}

export default App;
