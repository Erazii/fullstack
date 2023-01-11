import {useEffect, useState} from "react";
import axios from "axios";

const Weather = ({value}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState()
    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${value.capital[0]}&units=metric&APPID=${api_key}`)
            .then(response => {
                setWeather((response.data))
            })

    },[])
    if(weather !== undefined){
        return (
        <div>
            <h3>Weather in {value.capital}</h3>
            <p>Temperature {weather.main.temp} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={value.capital[0]}/>
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )}
}
export default Weather
