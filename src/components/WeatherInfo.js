import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectProcessedData,
  selectWeatherLocation,
} from "../features/weather/weatherSlice";
import { paginator } from "../utils";

import {
  Container,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  makeStyles,
  CssBaseline,
  Box,
  Typography,
} from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

import WeatherCard from "./WeatherCard";
import WeatherChart from "./WeatherChart";

const useStyles = makeStyles({
  next: {
    textAlign: "right",
  },
});

function WeatherInfo() {
  const classes = useStyles();

  const locationData = useSelector(selectWeatherLocation);
  const processedData = useSelector(selectProcessedData);
  const days = Object.keys(processedData);

  const [temperatureUnit, setTemperatureUnit] = useState("F");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState(
    paginator(days, currentPage, 3)
  );
  // Select the first day by default
  const [selectedDay, setSelectedDay] = useState(days[0]);

  // Controls for paginating Cards
  let canMovePrevious = currentPage > 1;
  let canMoveNext = paginatedData.next_page ? true : false;

  const moveToPreviousCard = () => {
    if (canMovePrevious) {
      setPaginatedData(paginator(days, currentPage - 1, 3));
      setCurrentPage(currentPage - 1);
    }
  };

  const moveToNextCard = () => {
    if (canMoveNext) {
      setPaginatedData(paginator(days, currentPage + 1, 3));
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container>
        <Box mt={2}>
          <Typography variant="h4" component="h1" align="center">
            The Weather Condition in {locationData.name}
          </Typography>
        </Box>
        <Box mt={1}>
          <RadioGroup
            row
            aria-label="temperatureUnit"
            name="tempUnit"
            value={temperatureUnit}
            onChange={(event) => setTemperatureUnit(event.target.value)}
          >
            <FormControlLabel value="C" control={<Radio />} label="Celsius" />
            <FormControlLabel
              value="F"
              control={<Radio />}
              label="Fahrenheit"
            />
          </RadioGroup>
        </Box>
        <Grid container>
          <Grid item xs={6}>
            {canMovePrevious && (
              <IconButton aria-label="previous" onClick={moveToPreviousCard}>
                <ArrowBack fontSize="large" />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={6} className={classes.next}>
            {canMoveNext && (
              <IconButton aria-label="next" onClick={moveToNextCard}>
                <ArrowForward fontSize="large" />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <Box mb={4}>
          <Grid container spacing={2}>
            {paginatedData.data.map((day) => (
              <Grid item xs={4} key={day}>
                <WeatherCard
                  day={day}
                  temperatureUnit={temperatureUnit}
                  dayWeatherData={processedData[day]}
                  isSelected={day === selectedDay}
                  handleCardClick={setSelectedDay}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        {selectedDay && (
          <WeatherChart
            day={selectedDay}
            temperatureUnit={temperatureUnit}
            dayWeatherData={processedData[selectedDay]}
          />
        )}
      </Container>
    </>
  );
}

export default WeatherInfo;
