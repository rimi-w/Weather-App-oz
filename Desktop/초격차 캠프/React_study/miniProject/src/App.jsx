import { useState } from "react";
import TodoList from "./ToDoList/TodoList";
import "./App.css";
import CurrentTime from "./CurrentTime/CurrentTime";

function App() {
  const [todoList, setTodoList] = useState([
    { id: new Date(), content: "Plan your day" },
  ]);


  return (
    <div className="container">
      <div className="timeContainer">
        <CurrentTime />
      </div>
      <h1> 🗒️ To do List </h1>
      <div className="todoContainer">
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </div>
    </div>
  );
}

export default App;
