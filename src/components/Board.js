import {
  createBoard,
  getHiddenCount,
  openBoard,
  openCells,
} from "../utils/boardLogic";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/board";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React, { useContext, useEffect, useState } from "react";
import Cell from "./Cell";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import Modal from "./Modal";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import Timer from "./Timer";

const boardSizes = {
  easy: { bombCount: 10, row: 9, col: 9 },
  medium: { bombCount: 40, row: 16, col: 16 },
  hard: { bombCount: 99, row: 30, col: 16 },
};

function getBoardByDifficulty(difficulty) {
  return createBoard(boardSizes[difficulty]);
}

const useStyles = makeStyles(styles);

function Board(props) {
  const classes = useStyles();

  const { userDetails, getUserDetails } = useContext(UserContext);

  const [bombCount, setBombCount] = useState(
    boardSizes[props.difficulty].bombCount
  );
  const [rightFlagCount, setRightFlagCount] = useState(0);
  const [board, setBoard] = useState(getBoardByDifficulty(props.difficulty));
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isRestarted, setRestartFlag] = useState(false);
  const [openWinModal, setWinModal] = useState(false);
  const [openLoseModal, setLoseModal] = useState(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setElapsedTime((elapsedTime) => elapsedTime + 1);
    }, 1000);
    setTimerInterval(timerInterval);

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRestarted]);

  function restartGame() {
    setRightFlagCount(0);
    setBombCount(boardSizes[props.difficulty].bombCount);
    setLoseModal(false);
    setBoard(getBoardByDifficulty(props.difficulty));
    setElapsedTime(0);
    setRestartFlag(!isRestarted);
  }

  async function handleCellClick(x, y) {
    if (board[x][y].isRevealed || board[x][y].isFlagged) return null;

    if (board[x][y].isBomb) {
      await handleLose();
    }

    const updatedBoard = [...board];
    updatedBoard[x][y].isRevealed = true;

    if (board[x][y].isEmpty) {
      openCells(updatedBoard, x, y);
    }

    if (getHiddenCount(board) === bombCount) {
      await handleWin();
    }

    setBoard(updatedBoard);
  }

  async function handleContextMenu(e, x, y) {
    e.preventDefault();

    if (board[x][y].isRevealed) return;

    const updatedBoard = [...board];
    let updatedBombCount = bombCount;
    let updatedRightFlagCount = rightFlagCount;

    if (updatedBoard[x][y].isFlagged) {
      updatedBombCount++;
      if (updatedBoard[x][y].isBomb) {
        updatedRightFlagCount--;
      }
    } else {
      updatedBombCount--;
      if (updatedBoard[x][y].isBomb) {
        updatedRightFlagCount++;
      }
    }

    setBombCount(updatedBombCount);
    setRightFlagCount(updatedRightFlagCount);

    updatedBoard[x][y].isFlagged = !updatedBoard[x][y].isFlagged;

    if (updatedRightFlagCount === boardSizes[props.difficulty].bombCount) {
      await handleWin();
    }
    setBoard(updatedBoard);
  }

  async function handleWin() {
    await addWinCount();
    await addPlayCount();
    const previousBest =
      userDetails.bestResults && userDetails.bestResults[props.difficulty];
    if (!previousBest || previousBest > elapsedTime) {
      await updateBestResult(elapsedTime);
    }

    getUserDetails();
    openBoard(board);
    setBoard(board);
    clearInterval(timerInterval);
    setWinModal(true);
  }

  async function updateBestResult(newBest) {
    await axios.patch(`http://localhost:8050/users/${userDetails._id}`, {
      [`bestResults.${props.difficulty}`]: newBest,
    });
  }

  async function addWinCount() {
    await axios.patch(`http://localhost:8050/users/${userDetails._id}`, {
      winCount: userDetails.winCount + 1,
    });
  }

  async function addPlayCount() {
    await axios.patch(`http://localhost:8050/users/${userDetails._id}`, {
      totalPlayCount: userDetails.totalPlayCount + 1,
    });
  }

  async function handleLose() {
    openBoard(board);
    setBoard(board);

    clearInterval(timerInterval);
    await addPlayCount();

    getUserDetails();
    setLoseModal(true);
  }

  function drawBoard(board) {
    return board.map((boardRow, i) => {
      return (
        <div className={classes.row} key={i}>
          {boardRow.map((item) => {
            return (
              <div key={item.y * boardRow.length + item.x}>
                <Cell
                  value={item}
                  onClick={() => handleCellClick(item.x, item.y)}
                  contextMenu={(e) => handleContextMenu(e, item.x, item.y)}
                />
              </div>
            );
          })}
        </div>
      );
    });
  }

  return (
    <Box className={classes.wrapper}>
      <div className={classes.textWrapper}>
        <Typography variant="h6">Bombs remaining: {bombCount}</Typography>
        <Timer elapsedTime={elapsedTime} />
      </div>
      <div>{drawBoard(board)}</div>
      <div>
        <Modal
          open={openWinModal}
          title="Congratulations 🎉 You won!"
          links={[{ name: "Go back to main page", linkTo: "/main/landing" }]}
          handleClose={() => {
            setWinModal(false);
          }}
        />
        <Modal
          open={openLoseModal}
          title="You lost 😢 Do you want to try again?"
          links={[{ name: "Quit", linkTo: "/main/landing" }]}
          buttons={[{ name: "Restart", onClick: restartGame }]}
          handleClose={() => {
            setLoseModal(false);
          }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          startIcon={<SettingsBackupRestoreIcon />}
          onClick={restartGame}
        >
          Restart
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          startIcon={<ExitToAppIcon />}
          component={Link}
          to="/main/landing"
        >
          Quit
        </Button>
      </div>
    </Box>
  );
}

export default Board;
