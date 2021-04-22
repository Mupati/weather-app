import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@material-ui/core";

import PreLoader from "./components/PreLoader";
import WeatherInfo from "./components/WeatherInfo";

import {
  selectQueryStatus,
  getWeatherData,
} from "./features/weather/weatherSlice";

function App() {
  const dispatch = useDispatch();
  const queryStatus = useSelector(selectQueryStatus);

  useEffect(() => {
    dispatch(getWeatherData());
  }, [dispatch]);

  return (
    <Box>{queryStatus === "loading" ? <PreLoader /> : <WeatherInfo />}</Box>
  );
}

export default App;
