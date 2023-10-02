import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import WeatherDisplay from "../components/WeatherDisplay";
import TrailInfo from "../components/TrailInfo";

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

  return (
    <div>
      <Nav />
      <div>
        <WeatherDisplay data={data} />
        <TrailInfo />
      </div>
    </div>
  );
}

export default Trail;
