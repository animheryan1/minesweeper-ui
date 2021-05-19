import Typography from "@material-ui/core/Typography";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  timer: {
    padding: "3px",
    border: "3px solid grey",
    borderRadius: "5px",
  },
}));

function Timer(props) {
  const classes = useStyles();

  function getFormattedTime(totalSeconds) {
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    if (seconds < 10) {
      return `${minutes}:0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }
  return (
    <Typography variant="h6" className={classes.timer}>
      Time: {getFormattedTime(props.elapsedTime)}
    </Typography>
  );
}
export default Timer;
