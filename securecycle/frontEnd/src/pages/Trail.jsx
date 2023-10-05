import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import WeatherDisplay from "../components/WeatherDisplay";
import TrailInfo from "../components/TrailInfo";
import MyMap from "../components/GeojsonMap";
import RotateSlides from "../components/RotateSlides";
import styles from "./Trail.module.css";

function Trail() {
  const [location, setLocation] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    const windData = [
      { lat: 40, lon: -100, speed: 10, direction: 45, gust: 12 },
      //... more data points
    ];

  return (
    <div>
      <Nav />
      <div>explore</div>
      <div className={styles["trail-slides"]}><RotateSlides /></div>
      <div className={styles["trail-container1"]}>
      <div className={styles["trail-container1-left"]}>
      <div className={styles["trail-container1-left-upper"]}><WeatherDisplay data={data} /></div>
      <div className={styles["trail-container1-left-lower"]}>Trail Info</div>
      </div>
      <div className={styles["trail-container1-right"]}><MyMap /></div>
      </div>
      
      
        
      
    </div>
  );
}

export default Trail;
