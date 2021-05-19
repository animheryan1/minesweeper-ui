import { useParams } from "react-router-dom";
import React from "react";
import Board from "../components/Board";

function Game() {
  const { difficulty } = useParams();

  return (
    <>
      <Board difficulty={difficulty} />
    </>
  );
}
export default Game;
