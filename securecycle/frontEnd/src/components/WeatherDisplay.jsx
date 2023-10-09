import React from "react";
import "./Weather.css";

function WeatherDisplay({ data }) {
  const temperatureCelsius = data.main.temp - 273.15;
  const background = getBackground(temperatureCelsius);
  const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  function getBackground(temp) {
    if (temp <= 15) {
      return "#81a4db"; // Cold: Blue shade
    } else if (temp > 15 && temp <= 25) {
      return "#ffb347"; // Moderate: Orange shade
    } else {
      return "#e63946"; // Hot: Red shade
    }
  }

  function getInstructions(temp, condition, windSpeed) {
    let instructions = {
      title: "Bicycle Trail Safety Guide",
      advice: [],
    };

    if (temp <= 15) {
      instructions.advice.push(
        "It's cold outside! Make sure to wear thermal cycling gear."
      );
      instructions.advice.push(
        "Consider trails with lower altitudes; they might be warmer."
      );
      instructions.advice.push(
        "Be cautious: cold weather may cause icy conditions on some trails."
      );
    } else if (temp > 15 && temp <= 25) {
      instructions.advice.push(
        "Moderate weather is ideal for most trails. Enjoy your ride!"
      );
      instructions.advice.push(
        "Trails through woods or parks can be especially refreshing during this temperature range."
      );
      if (windSpeed > 5) {
        instructions.advice.push(
          "Breezy day! Watch out for strong crosswinds on open trails. Consider more sheltered routes."
        );
      }
    } else {
      instructions.advice.push(
        "It's quite hot! Hydrate well and wear sun protection."
      );
      instructions.advice.push(
        "Avoid strenuous trails during peak sun hours. Morning or evening rides are ideal."
      );
      if (condition.includes("rain")) {
        instructions.advice.push(
          "Rainy conditions can make trails slippery. Ensure your tires are in good condition and avoid muddy areas."
        );
      }
    }

    return instructions;
  }
  const bicycleSafetyInstructions = getInstructions(
    temperatureCelsius,
    data.weather[0].description,
    data.wind.speed
  );
  return (
    <div className="weather-grid">
      <main className="weatherContainer" style={{ background: background }}>
        <img src={iconURL} alt={data.weather[0].description} />
        <div className="weatherDesc">
          Weather condition: {data.weather[0].description}
        </div>
        <div className="temp">
          Temperature: {Math.round(temperatureCelsius)}°C
        </div>
        <div className="humidity">Humidity: {data.main.humidity}%</div>
        <div className="windDirection">Wind Speed: {data.wind.speed} m/s</div>
        <div className="windDirection">
          Wind Direction: {data.wind.deg} m/s
          <div
            className="arrow"
            style={{ transform: `rotate(${data.wind.deg}deg)` }}
          ></div>
        </div>
      </main>
      <div className="instructions">
        <h2>{bicycleSafetyInstructions.title}</h2>
        {bicycleSafetyInstructions.advice.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;
