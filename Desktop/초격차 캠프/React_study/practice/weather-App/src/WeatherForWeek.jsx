import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
    min-width: 500px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const WeatherCardContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
`
const CityName = styled.h2`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 50px;
`

const WeatherCard = styled.div`
    width: 150px;
    height: 150px;
    border: none;
    border-radius: 30px;
    background-color: #ffffffa3;
    box-shadow: 5px 5px 0 0 #4040401a;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        
        h3 {
            font-size: 20px;
            font-weight: 700;
        }

        p{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 5px;
            img {
                width: 15px;
                margin-right: 10px;
            }
        }
    }
`

const WeatherForWeek = ({ useFetch }) => {
    const [location, setLocation] = useState({ lat: null, lon: null });
    const [error, setError] = useState(null);
    const { isLoading, data } = useFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&lang=kr&appid=a0faeaf6914352d0fb796ac6b7ad0307`);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (error) => {
                setError(error.message);
                console.log(error)
            }
        );
    }, []);

    return (
        <>
            {data &&
                <Container>
                    <CityName>📍 {data.city.name}</CityName>
                    <WeatherCardContainer>
                        <DisplayWeather data={data} />
                    </WeatherCardContainer>
                </Container>
            }
        </>
    )
}

const DisplayWeather = ({ data }) => {
    const displayWeatherData = data.list.filter((el, index) => {
        return index === 0 || index % 8 === 0;
    })

    return displayWeatherData.map((el) => {
        const currentMonth = new Date(el.dt_txt).getMonth();
        const currentDate = new Date(el.dt_txt).getDate();
        return (
            <WeatherCard>
                <div>
                    <h3>{currentMonth}. {currentDate}</h3>
                    <img src={`https://openweathermap.org/img/wn/${el.weather[0].icon}.png`} />
                </div>
                <div>
                    <p>{el.weather[0].description}</p>
                    <p>
                        <img src="./src/assets/free-icon-centigrade-5105265.png" />
                        {el.main.temp}
                    </p>
                </div>
            </WeatherCard>
        );
    })
};



export default WeatherForWeek;