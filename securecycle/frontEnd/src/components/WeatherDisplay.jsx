import React from "react";
import "./Weather.css";

function WeatherDisplay({ data }) {
  const background = getBackground(data.main.temp - 273.15);
  const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

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
          {data.name}, {data.sys.country}
        </h1>
        <img src={iconURL} alt={data.weather[0].description} />
        <div> Weather condition: {data.weather[0].description} </div>
        <div> Feels Like: {Math.round(data.main.feels_like - 273.15)}°C </div>
        <div> Humidity: {data.main.humidity}% </div>
        <div> Wind Speed: {data.wind.speed} m/s </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
