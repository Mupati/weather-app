import React from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import { getAverageTemperature, formatWeatherDay } from "../utils";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
  },
});

function WeatherCard({
  day,
  temperatureUnit,
  dayWeatherData,
  isSelected,
  handleCardClick,
}) {
  const classes = useStyles();

  const averageTemperature = getAverageTemperature(
    dayWeatherData,
    "temp",
    temperatureUnit
  );

  return (
    <Card
      className={classes.root}
      variant={isSelected ? "elevation" : "outlined"}
      onClick={() => handleCardClick(day)}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Temp:
        </Typography>
        <Typography variant="h5" component="h2">
          {`${averageTemperature} ${temperatureUnit}`}
        </Typography>
        <Typography color="textSecondary">Date:</Typography>
        <Typography variant="h5" component="h2">
          {formatWeatherDay(day)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
