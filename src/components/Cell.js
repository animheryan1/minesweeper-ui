import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/cell";
import React from "react";

const useStyles = makeStyles(styles);
function Cell(props) {
  const classes = useStyles();

  function getIcon(value) {
    if (!value.isRevealed) {
      return value.isFlagged ? "🏳️" : null;
    }
    if (value.isBomb) {
      return "💥";
    }
    if (value.neighbourCount === 0) {
      return null;
    }
    return value.neighbourCount;
  }

  return (
    <div
      className={
        classes.cell + " " + (!props.value.isRevealed ? classes.hidden : "")
      }
      onClick={props.onClick}
      onContextMenu={props.contextMenu}
    >
      {getIcon(props.value)}
    </div>
  );
}
export default Cell;
