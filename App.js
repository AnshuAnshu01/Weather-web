import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = '153fc57a25deb80c5b77bf1b9fe38cd5';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('City not found. Please try again.');
      } else {
        setError('Failed to fetch weather data.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  };

  return (
    <div className="app">
      <div className="overlay" />
      <h1 className="title">🌤️ Weather Dashboard</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p className="info">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>📍 {weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>🌡️ {weather.main.temp}°C</p>
          <p>📋 {weather.weather[0].main}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind Speed: {weather.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
