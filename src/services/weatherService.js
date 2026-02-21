// apiKey stores the environment variable VITE_WEATHER_API based on the documentation from Vite https://vite.dev/guide/env-and-mode
const apiKey = import.meta.env.VITE_WEATHER_API;
export async function getWeather(city) {
    // using fetch to grab weather data from openweathermap 2.5 using the syntax provided by the API documentation https://openweathermap.org/current?collection=current_forecast
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = await response.json();
    return data;
}
export const getAirQuality = async (lat, lon) => {
  const API_KEY = import.meta.env.VITE_WEATHER_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  return await response.json();
};

 