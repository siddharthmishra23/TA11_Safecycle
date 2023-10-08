import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import WeatherDisplay from "../components/WeatherDisplay";

import MyMap from "../components/GeojsonMap";
import RotateSlides from "../components/RotateSlides";
import styles from "./Trail.module.css";

function Trail() {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTrail, setSelectedTrail] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (location) {
      const fetchData = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=c8eaace3c20c515a4ec0c4990bb684a7`;

        try {
          const response = await fetch(url);
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false); // Set loading to false after API call is done.
        }
      };

      fetchData();
    }
  }, [location]);

  if (isLoading) {
    return <Loader />;
  }
  // const windData = [
  //   { lat: location.lat,
  //     lon: location.long,
  //     speed: data.wind.speed,
  //     direction: data.wind.deg,
  //     gust: data.wind.gust }, //... more data points
  // ];
  const speed = data.wind.speed;
  const gust = data.wind.gust;
  const arrowStyle = {
    transform: `rotate(${data.wind.deg}deg)`,
    height: `${gust*1.5}rem`
  };

 

  const handleTrailSelect = (trailName) => {
    setSelectedTrail(trailName);
    // Use the selected trail's name as required
  };



  return (
    <div>
      <Nav />
      <div>explore</div>
      <div className={styles["trail-slides"]}>
        <RotateSlides onSelect={handleTrailSelect}/>
      </div>
      <div className={styles["trail-container1"]}>
        <div>
          <div className={styles["trail-container1-left-upper"]}>
            <WeatherDisplay data={data} />
          </div>
          <div className={styles["trail-container1-left-lower"]}>
          Wind Information Selected Trail: {selectedTrail}
          <div className={styles["wind-container"]}>
          <div>Speed: {speed} m/s</div>
          <div>Gust: {gust} m/s</div>
          <div>Direction: {data.wind.deg}°</div>
          <div className={styles["arrow"]} style={arrowStyle}></div>
        </div>
          </div>
        </div>
        <div>
          <MyMap selected_trail={selectedTrail}/>
        </div>
      </div>
    </div>
  );
}

export default Trail;
