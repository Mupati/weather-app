import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControlLabel, Checkbox, Grid } from "@material-ui/core";
import { setTemperatureUnit } from "../features/weather/weatherSlice";

function CheckboxGroup() {
  const temperatureUnit = useSelector((state) => state.weather.temperatureUnit);
  const dispatch = useDispatch();

  return (
    <Grid container>
      <Grid item xs={6}>
        <FormControlLabel
          control={
            <Checkbox
              checked={temperatureUnit === "C"}
              color="primary"
              onClick={() => dispatch(setTemperatureUnit("C"))}
              name="celsius"
            />
          }
          label="Celsius"
        />
      </Grid>
      <Grid item xs={6}>
        <FormControlLabel
          control={
            <Checkbox
              checked={temperatureUnit === "F"}
              color="primary"
              onClick={() => dispatch(setTemperatureUnit("F"))}
              name="fahrenheit"
            />
          }
          label="Fahrenheit"
        />
      </Grid>
    </Grid>
  );
}

export default CheckboxGroup;
