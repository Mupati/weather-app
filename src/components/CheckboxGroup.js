import React from "react";
import { Box, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

function CheckboxGroup({ unit, setUnit }) {
  return (
    <Box mt={1} display="flex" justifyContent="center" alignItems="center">
      <RadioGroup
        row
        aria-label="temperatureUnit"
        name="tempUnit"
        value={unit}
        onChange={(event) => setUnit(event.target.value)}
      >
        <FormControlLabel
          value="C"
          control={<Radio color="primary" />}
          label="Celsius"
        />
        <FormControlLabel
          value="F"
          control={<Radio color="primary" />}
          label="Fahrenheit"
        />
      </RadioGroup>
    </Box>
  );
}

export default CheckboxGroup;
