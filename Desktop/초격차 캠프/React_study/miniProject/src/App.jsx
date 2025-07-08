import { useState, useEffect } from "react";
import TodoList from "./ToDoList/TodoList";
import CurrentTime from "./CurrentTime/CurrentTime";
import Saying from "./Saying/Saying";
import "./App.css";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, [url]);
  return [isLoading, data];
}

function App() {
  const [isLoading, data] = useFetch(`http://localhost:3001/todo`)
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    isLoading === false && setTodoList(data)
  }, [isLoading]);

  return (
    <div className="container">
      <h1> 🗒️ To do List </h1>
      <Saying useFetch={useFetch} />
      <hr />
      <div className="timeContainer">
        <CurrentTime />
      </div>
      <div className="todoContainer">
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </div>
    </div>
  );
}

export default App;
