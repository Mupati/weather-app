import React, { useState } from "react";

import { useSelector } from "react-redux";
import { selectWeatherData } from "../features/weather/weatherSlice";

import {
  Container,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

import WeatherCard from "./WeatherCard";
import WeatherChart from "./WeatherChart";

function WeatherInfo() {
  const weatherData = useSelector(selectWeatherData);
  console.log(weatherData);

  const [temperatureUnit, setTemperatureUnit] = useState("fahrenheit");

  return (
    <Container>
      <Grid>
        <RadioGroup
          aria-label="temperatureUnit"
          name="tempUnit"
          value={temperatureUnit}
          onChange={(event) => setTemperatureUnit(event.target.value)}
          row
        >
          <FormControlLabel
            value="celcius"
            control={<Radio />}
            label="Celcius"
          />
          <FormControlLabel
            value="fahrenheit"
            control={<Radio />}
            label="Fahrenheit"
          />
        </RadioGroup>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <IconButton aria-label="previous">
            <ArrowBack fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <IconButton aria-label="next">
            <ArrowForward fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid>
        <WeatherCard />
      </Grid>
      <WeatherChart />
    </Container>
  );
}

export default WeatherInfo;
