import React, { useState } from "react";

import { useSelector } from "react-redux";
import { selectProcessedData } from "../features/weather/weatherSlice";

import {
  Container,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  makeStyles,
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
  const [temperatureUnit, setTemperatureUnit] = useState("fahrenheit");

  const processedData = useSelector(selectProcessedData);

  const paginator = (items, current_page, per_page_items) => {
    let page = current_page || 1,
      per_page = per_page_items || 10,
      offset = (page - 1) * per_page,
      paginatedItems = items.slice(offset).slice(0, per_page_items),
      total_pages = Math.ceil(items.length / per_page);

    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems,
    };
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData] = useState(
    paginator(Object.keys(processedData), currentPage, 3)
  );

  let canMovePrevious = currentPage > 1;
  let canMoveNext = currentPage < paginatedData.total;

  const moveToPreviousCard = () => {
    if (canMovePrevious) {
      setCurrentPage(currentPage - 1);
    }
  };

  const moveToNextCard = () => {
    if (canMoveNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  /**
   * TODO LIST
   * Selecting a Default Card and passing corresponding data to the WeatherChart
   *
   */

  return (
    <Container>
      <Grid>
        <RadioGroup
          row
          aria-label="temperatureUnit"
          name="tempUnit"
          value={temperatureUnit}
          onChange={(event) => setTemperatureUnit(event.target.value)}
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
      <Grid container spacing={2}>
        {paginatedData.data.map((day) => (
          <Grid item xs={4} key={day}>
            <WeatherCard day={day} />
          </Grid>
        ))}
      </Grid>
      <WeatherChart />
    </Container>
  );
}

export default WeatherInfo;
