import React, { Fragment } from "react";

import WeatherCard from "./WeatherCard";
import WeatherChart from "./WeatherChart";
import CardNavigator from "./CardNavigator";
import CheckboxGroup from "./CheckboxGroup";

function WeatherInfo() {
  return (
    <Fragment>
      <CheckboxGroup />
      <CardNavigator />
      <WeatherCard />
      <WeatherChart />
    </Fragment>
  );
}

export default WeatherInfo;
