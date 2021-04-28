import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, IconButton, makeStyles } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import {
  moveToPreviousCard,
  moveToNextCard,
  canMoveToPreviousCard,
  canMoveToNextCard,
} from "../features/weather/weatherSlice";

const useStyles = makeStyles({
  next: {
    textAlign: "right",
  },
});

function CardNavigator() {
  // styles
  const classes = useStyles();

  const dispatch = useDispatch();
  const shouldShowPrevBtn = useSelector(canMoveToPreviousCard);
  const shouldShowNextBtn = useSelector(canMoveToNextCard);

  return (
    <Grid container>
      <Grid item xs={6}>
        <IconButton
          aria-label="previous"
          onClick={() => dispatch(moveToPreviousCard)}
          data-testid="previous"
          style={{ display: shouldShowPrevBtn ? "" : "none" }}
        >
          <ArrowBack fontSize="large" />
        </IconButton>
      </Grid>
      <Grid item xs={6} className={classes.next}>
        <IconButton
          aria-label="next"
          onClick={() => dispatch(moveToNextCard)}
          data-testid="next"
          style={{ display: shouldShowNextBtn ? "" : "none" }}
        >
          <ArrowForward fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default CardNavigator;
