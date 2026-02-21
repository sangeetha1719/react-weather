import { useState, useEffect } from 'react';
import { getWeather } from './services/weatherService';
import './App.css';
import hotIcon from './assets/hot.png';
import humidityIcon from './assets/humidity.png';
import pressureIcon from './assets/pressure.png';
import visibilityIcon from './assets/visibility.png';
import windIcon from './assets/wind.png';

const Weather = ({ name, value, icon }) => {
  return (
    <WeatherContainer>
      <WeatherIcon src={icon} alt={name} />
      <WeatherValue>{value}</WeatherValue>
      <WeatherName>{name}</WeatherName>
    </WeatherContainer>
  );
};

const GridItem = ({label , temp ,icon , alt }) => {
  return (
    <div className="grid-item">
      <p className="label">{label}</p>
      <p className="temp">{Math.round(temp)}°F</p>
      <img src={icon} alt={alt} />
    </div>
  )
}

const App = () => {
  // Store weather data from API
  const [weatherData, setWeatherData] = useState(null);
  // Store current city to display
  const [city, setCity] = useState("New York");
  // Store user input from search box
  const [searchCity, setSearchCity] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (searchCity.trim()) {
      setCity(searchCity); // Update city
      setSearchCity(""); // Clear input
    }
  };

  // Fetch weather data when city changes
  useEffect(() => {
    getWeather(city)
      .then((data) => setWeatherData(data))
      .catch((err) => console.error("Failed to fetch weather:", err));
  }, [city]);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <main className='weather-card'>
        <h1>Path2Tech Weather App</h1>
        
        {/* Search form */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="searchCity">Enter your city</label>

          <input 
            type="text" 
            className="search-bar" 
            placeholder="Enter city name..." 
            value={searchCity} 
            onChange={(e) => setSearchCity(e.target.value)} 
          />
          <button type="submit">Search</button>
        </form>

        {/* Display weather data if available */}
        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            
            {/* Weather icon - displays current condition icon from OpenWeatherMap API */}
            <img 
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <p className="description">{weatherData.weather[0].description}</p>
            
            {/* Details grid - displays temperature, humidity, wind speed, and other metrics */}
    <div className="details-grid">
      <GridItem label="Temperature" temp={weatherData.main.temp} icon={hotIcon} alt="temperature"/>
      <GridItem label="pressure" temp={weatherData.main.temp_max} icon={pressureIcon} />
      <GridItem label="visibility" temp={weatherData.main.temp_min} icon={visibilityIcon} />
      <GridItem label="Humidity" temp={weatherData.main.humidity} icon={humidityIcon} />
      <GridItem label="Feels Like" temp={weatherData.main.feels_like} icon={hotIcon} />
      <GridItem label="Wind Speed" temp={weatherData.wind.speed} icon={windIcon} />
    </div>
    </div>
        )}
        
        {/* Dark mode toggle button */}
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? ' Light Mode' : 'Dark Mode'}
        </button>
      </main>
    </div>
  );
};

export default App;