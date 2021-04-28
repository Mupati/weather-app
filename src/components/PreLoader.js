import React, { Fragment } from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
});

function PreLoader() {
  const classes = useStyles();
  const status = useSelector((state) => state.weather.status);

  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {status === "loading" ? (
        <Fragment>
          <h1>Loading...</h1>
          <CircularProgress />
        </Fragment>
      ) : (
        <h1>An error occured while loading weather data. Try again later...</h1>
      )}
    </Box>
  );
}

export default PreLoader;
