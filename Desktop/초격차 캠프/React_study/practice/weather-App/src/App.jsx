import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import WeatherForWeek from "./WeatherForWeek";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #93d7ff;
  }

  #root {
    width: 100vw;
    height: 100vh;
    padding: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // 에러 상태도 추가하면 좋아

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, data, error };
};


function App() {

  return (
    <>
      <GlobalStyle />
      <WeatherForWeek useFetch={useFetch} />
    </>
  )
}

export default App;
