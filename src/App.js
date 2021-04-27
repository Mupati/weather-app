import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@material-ui/core";

import PreLoader from "./components/PreLoader";
import WeatherInfo from "./components/WeatherInfo";

import { getWeatherData } from "./features/weather/weatherSlice";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.weather.status);

  useEffect(() => {
    dispatch(getWeatherData("imperial"));
    dispatch(getWeatherData("metric"));
  }, [dispatch]);

  return <Box>{status !== "idle" ? <PreLoader /> : <WeatherInfo />}</Box>;
}

export default App;
