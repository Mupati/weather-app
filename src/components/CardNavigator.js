import React from "react";
import { Grid, IconButton, makeStyles } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

const useStyles = makeStyles({
  next: {
    textAlign: "right",
  },
});

function CardNavigator({
  canMovePrevious,
  canMoveNext,
  moveToPreviousCard,
  moveToNextCard,
}) {
  const classes = useStyles();
  return (
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
  );
}

export default CardNavigator;
