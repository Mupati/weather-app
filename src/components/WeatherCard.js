import React from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import { computeAverageTemperature, formatWeatherDay } from "../utils";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    backgroundColor: (isSelected) =>
      isSelected ? "rgba(54, 162, 235, 0.2)" : "",
    "&:hover": {
      borderColor: "rgba(54, 162, 235, 1)",
    },
  },
});

function WeatherCard({
  day,
  temperatureUnit,
  dayWeatherData,
  isSelected,
  handleCardClick,
}) {
  const classes = useStyles(isSelected);
  const degreeSymbol = <sup>°</sup>;

  const averageTemperature = computeAverageTemperature(
    dayWeatherData,
    temperatureUnit
  );

  return (
    <Card
      classes={{
        root: classes.root,
      }}
      variant={isSelected ? "elevation" : "outlined"}
      onClick={() => handleCardClick(day)}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Temp:
        </Typography>
        <Typography variant="h5" component="h2">
          {averageTemperature.toFixed(2)}
          {degreeSymbol}
          {temperatureUnit}
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
