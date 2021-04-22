import React from "react";
import { Box, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
  },
});

function PreLoader() {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );
}

export default PreLoader;
