import React from "react";
import { useSelector } from "react-redux";
import { selectWeatherData } from "../features/weather/weatherSlice";

import WeatherCard from "./WeatherCard";
import WeatherChart from "./WeatherChart";

function WeatherInfo() {
  const weatherData = useSelector(selectWeatherData);
  console.log(weatherData);

  return (
    <>
      <h1>WeatherInfo</h1>
      <WeatherCard />
      <WeatherChart />
    </>
  );
}

export default WeatherInfo;
