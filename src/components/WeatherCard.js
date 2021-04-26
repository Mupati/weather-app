import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Card,
  makeStyles,
  CardContent,
  Typography,
} from "@material-ui/core";
import { computeAverageTemperature, formatWeatherDay } from "../utils";

import {
  selectPaginatedDays,
  selectWeatherData,
  setSelectedDay,
} from "../features/weather/weatherSlice";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    "&:hover": {
      borderColor: "rgba(54, 162, 235, 1)",
    },
  },
  rootHover: {
    backgroundColor: "rgba(54, 162, 235, 0.2)",
  },
});

function WeatherCard() {
  const temperatureUnit = useSelector((state) => state.weather.temperatureUnit);
  const selectedDay = useSelector((state) => state.weather.selectedDay);
  const weatherData = useSelector(selectWeatherData);
  const paginatedDays = useSelector(selectPaginatedDays);

  const dispatch = useDispatch();

  const classes = useStyles(true);
  const degreeSymbol = <sup>°</sup>;

  // const currentlySelectedCard = selectedDay ? days[0] :

  return (
    <Box mb={4}>
      <Grid container spacing={2}>
        {paginatedDays.data.map((day) => (
          <Grid item xs={4} key={day}>
            <Card
              classes={{
                root: classes.root,
              }}
              className={selectedDay === day ? classes.rootHover : ""}
              variant={selectedDay === day ? "elevation" : "outlined"}
              onClick={() => dispatch(setSelectedDay(day))}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Temp:
                </Typography>
                <Typography variant="h5" component="h2">
                  {computeAverageTemperature(weatherData[day]).toFixed(2)}
                  {degreeSymbol}
                  {temperatureUnit}
                </Typography>
                <Typography color="textSecondary">Date:</Typography>
                <Typography variant="h5" component="h2">
                  {formatWeatherDay(day)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default WeatherCard;
