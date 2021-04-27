import React from "react";
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
  const errorMessage = useSelector((state) => state.weather.errorMessage);

  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {status === "loading" ? (
        <>
          <h1>Loading...</h1>
          <CircularProgress />
        </>
      ) : (
        <h1>{errorMessage}</h1>
      )}
    </Box>
  );
}

export default PreLoader;
