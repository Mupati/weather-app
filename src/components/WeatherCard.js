import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Card,
  makeStyles,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { computeAverageTemperature, formatWeatherDay } from "../utils";

import {
  selectPaginatedDays,
  selectWeatherData,
  setSelectedDay,
  setPageSize,
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
  const pageSize = useSelector((state) => state.weather.pageSize);
  const selectedDay = useSelector((state) => state.weather.selectedDay);
  const weatherData = useSelector(selectWeatherData);
  const paginatedDays = useSelector(selectPaginatedDays);

  const dispatch = useDispatch();

  const classes = useStyles(true);
  const degreeSymbol = <sup>°</sup>;

  const theme = useTheme();
  const isExtraSmall = useMediaQuery(theme.breakpoints.up("xs"));
  const isSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const setNumberVisibleCards = () => {
      if (isMedium) dispatch(setPageSize(3));
      else if (isSmall) dispatch(setPageSize(2));
      else if (isExtraSmall) dispatch(setPageSize(1));
    };
    setNumberVisibleCards();
  }, [isExtraSmall, isSmall, isMedium, dispatch]);

  return (
    <Box mb={4}>
      <Grid container spacing={2}>
        {paginatedDays.data.map((day) => (
          <Grid item xs={12 / pageSize} key={day}>
            <Card
              classes={{
                root: classes.root,
              }}
              className={selectedDay === day ? classes.rootHover : ""}
              variant={selectedDay === day ? "elevation" : "outlined"}
              onClick={() => dispatch(setSelectedDay(day))}
              data-testid="weather-card"
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
