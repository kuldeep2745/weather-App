import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('bhopal');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  console.log("weatherData", weatherData);

  const API_KEY = '623247fd14ad6cb2dfa42bec912a5aac'; // Replace with your OpenWeatherMap API key

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        setWeatherData(response.data);
        setError(null);
      } catch (err) {
        setWeatherData(null);
        setError('City not found');
      }
    };

    fetchData(); // Invoke the async function
  }, [city, API_KEY]); // Add dependencies to the dependency array

  // const getWeatherData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  //     );

  //     setWeatherData(response.data);
  //     setError(null);
  //   } catch (err) {
  //     setWeatherData(null);
  //     setError('City not found');
  //   }
  // };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="search-form">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {/* <button onClick={getWeatherData}>Get Weather</button> */}
      </div>

      {weatherData && (
        <div className="weather-info card">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
