import React from "react";

const Cell = ({ cell, onClick }) => {
  const getValue = () => {
    if (!cell.isCellOpen) {
      return null;
    }
    if (cell.isCellBomb) {
      return "🧨";
    }
    if (cell.countBombsNear === 0) {
      return null;
    }
    return cell.countBombsNear;
  };

  const className =
    "cell" +
    (cell.isCellOpen ? "" : " hidden") +
    (cell.isCellBomb ? " is-bomb" : "");

  return (
    <div onClick={onClick} className={className}>
      {getValue()}
    </div>
  );
};

export default Cell;
