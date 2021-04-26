import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, IconButton, makeStyles } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import {
  decreaseCurrentPage,
  increaseCurrentPage,
  selectPaginatedDays,
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
  const currentPage = useSelector((state) => state.weather.currentPage);
  const paginatedDays = useSelector(selectPaginatedDays);

  let canMovePrevious = currentPage > 0;
  let canMoveNext = paginatedDays.next_page ? true : false;

  const moveToPreviousCard = () => {
    if (canMovePrevious) {
      dispatch(decreaseCurrentPage());
    }
  };

  const moveToNextCard = () => {
    if (canMoveNext) {
      dispatch(increaseCurrentPage());
    }
  };

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
