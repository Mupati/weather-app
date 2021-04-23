import React from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function WeatherCard({ day }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Temp:
        </Typography>
        <Typography variant="h5" component="h2">
          23 F
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Date:
        </Typography>
        <Typography variant="body2" component="p">
          {day}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
