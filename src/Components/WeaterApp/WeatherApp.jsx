import React, { useState } from 'react'
import "./WeatherApp.css"
import search_icon from '../Assets/search.png'
import cloud_icon from '../Assets/cloud.png'
import clear_icon from '../Assets/clear.png'
import drizzle_icon from '../Assets/drizzle.png'
import humid_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'


function WeatherApp() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const apiKey = 'bdea7a19ecf4834ace3208e469c7ec1c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const search = async () => {
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setWeather(data);
            setError(null);
            console.log(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeather(null);
            setError('Error fetching weather data. Please try again.');
        }
    };

    let tempInKelvinn = parseFloat(weather?.main?.temp);
    let tempInCelsius = tempInKelvinn - 273.15



    return (
        <div className='container'>
            <div className='topbar'>

                <input
                    type='text'
                    className='cityInput'
                    placeholder='search'
                    value={city}
                    onChange={(e) => { setCity(e.target.value) }}
                />

                <div className='search-icon' onClick={() => { search() }}>
                    <img src={search_icon} alt="search" />
                </div>
            </div>
{/* //push */}

            <div className='box'>
                <div className='weather-image'>
                    {console.log("weather:", weather)}
                    {weather && weather.weather && (
                        <>
                            {console.log("weather.weather[0]:", weather.weather[0])}
                            {console.log("weather.weather[0]?.main:", weather.weather[0]?.main)}
                            {weather.weather[0]?.main === 'Clouds' && <img src={cloud_icon} alt="cloud" />}
                            {weather.weather[0]?.main === 'Clear' && <img src={clear_icon} alt="clear" />}
                            {weather.weather[0]?.main === 'Drizzle' && <img src={drizzle_icon} alt="drizzle" />}
                            {weather.weather[0]?.main === 'Rain' && <img src={rain_icon} alt="rain" />}
                            {weather.weather[0]?.main === 'Snow' && <img src={snow_icon} alt="snow" />}
                            {weather.weather[0]?.main === 'Wind' && <img src={wind_icon} alt="wind" />}
                        </>
                    )}
                </div>

                <div className='weather-temp'>{tempInCelsius.toFixed(2)} C</div>
                <div className="weather-location">{weather?.name}</div>

                <div className="data-container">
                    <div className="element">
                        <img src={humid_icon} alt="" className='icon' />
                        <div className="data">
                            <div className="humidity-percent">{weather?.main?.humidity} %</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>

                    <div className="element">
                        <img src={wind_icon} alt="" className='icon' />
                        <div className="data">
                            <div className="humidity-percent">{weather?.wind?.speed} km/hr</div>
                            <div className="text">WindSpeed</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}


export default WeatherApp
