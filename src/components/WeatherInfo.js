import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectProcessedData,
  selectWeatherLocation,
} from "../features/weather/weatherSlice";
import { paginator } from "../utils";

import { Container, Grid, Box, Typography } from "@material-ui/core";

import WeatherCard from "./WeatherCard";
import WeatherChart from "./WeatherChart";
import CardNavigator from "./CardNavigator";
import CheckboxGroup from "./CheckboxGroup";

function WeatherInfo() {
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
      <Container>
        <Box mt={2}>
          <Typography variant="h4" component="h1" align="center">
            The Weather Condition in {locationData.name}
          </Typography>
        </Box>

        <CheckboxGroup setUnit={setTemperatureUnit} unit={temperatureUnit} />
        <CardNavigator
          canMoveNext={canMoveNext}
          canMovePrevious={canMovePrevious}
          moveToNextCard={moveToNextCard}
          moveToPreviousCard={moveToPreviousCard}
        />

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
