import React from "react";
import { useState, useEffect } from "react";
import Cell from "./Cell.jsx";
import { initializeBoard, findEmpty } from "./boardHelper";

const Board = ({ boardSetting: { height, width, bombs } }) => {
  const [boardData, setBoardData] = useState([]);
  const [gameStatus, setGameStatus] = useState("In Progress ⏳");

  useEffect(() => {
    setBoardData(initializeBoard(height, width, bombs));
  }, [height, width, bombs]);

  const openAllCells = () => {
    let updatedBoard = boardData;
    updatedBoard.forEach((dataRow) => {
      dataRow.forEach((dataItem) => {
        dataItem.isCellOpen = true;
      });
    });

    setBoardData([...updatedBoard]);
  };

  const getAllHiddenCells = (board) => {
    let bombArray = [];

    board.forEach((dataRow) => {
      dataRow.forEach((dataItem) => {
        if (!dataItem.isCellOpen) {
          bombArray.push(dataItem);
        }
      });
    });

    return bombArray;
  };

  const handleCellClick = (x, y) => {
    if (boardData[x][y].isCellOpen) {
      return null;
    }

    if (boardData[x][y].isCellBomb) {
      setGameStatus("Game Over! ⚰️");
      openAllCells();
    }

    let updatedBoard = [...boardData];
    updatedBoard[x][y].isCellOpen = true;

    if (updatedBoard[x][y].isCellEmpty) {
      updatedBoard = findEmpty(x, y, updatedBoard, height, width);
    }

    if (getAllHiddenCells(updatedBoard).length === bombs) {
      setGameStatus("You Win! 🏆");
      openAllCells();
    }

    setBoardData(updatedBoard);
  };

  const playAgain = () => {
    setGameStatus("In Progress");
    setBoardData(initializeBoard(height, width, bombs));
  };

  const isGameOver = gameStatus === "Game Over! ⚰️";
  const isGameWin = gameStatus === "You Win! 🏆";

  const wrapperStyle = `wrapper ${
    isGameOver ? "game-over" : isGameWin ? "win" : ""
  }`;

  return (
    <div className={wrapperStyle}>
      <div className="game-status">
        {isGameOver && (
          <button className="btn" onClick={playAgain}>
            Play Again
          </button>
        )}
        <h1 className="status">
          <p>{gameStatus}</p>
        </h1>
      </div>
      <div className="board">
        {boardData.map((dataRow, index) => {
          return (
            <div className="row" key={index}>
              {dataRow.map((cell) => {
                return (
                  <Cell
                    key={cell.x + cell.y}
                    onClick={() => handleCellClick(cell.x, cell.y)}
                    cell={cell}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
