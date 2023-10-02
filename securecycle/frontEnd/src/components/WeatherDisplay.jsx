import React from "react";
import "./Weather.css";

function WeatherDisplay({ data }) {
  const background = getBackground(data.main.temp - 273.15);

  function getBackground(temp) {
    if (temp > 10 && temp < 34) {
      return "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";
    } else {
      return "white";
    }
  }

  return (
    <div className="weatherContainer" style={{ background: background }}>
      <div>
        <h1>
          Welcome to {data.name}, {data.sys.country}
        </h1>
        <span> Weather condition: {data.weather[0].description} </span>
        <span> Feels Like: {Math.round(data.main.feels_like - 273.15)}°C </span>
        <span> Humidity: {data.main.humidity}% </span>
        <span> Wind Speed: {data.wind.speed} m/s </span>
      </div>
    </div>
  );
}

export default WeatherDisplay;
