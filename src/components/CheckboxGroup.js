import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControlLabel,
  Checkbox,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { setTemperatureUnit } from "../features/weather/weatherSlice";

const useStyles = makeStyles({
  root: {
    marginTop: "16px",
  },
  center: {
    textAlign: "center",
  },
});

function CheckboxGroup() {
  const temperatureUnit = useSelector((state) => state.weather.temperatureUnit);
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={6} className={classes.center}>
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
      <Grid item xs={6} className={classes.center}>
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
