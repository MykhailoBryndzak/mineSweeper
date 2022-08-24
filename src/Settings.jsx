import React, { useState } from "react";

const Settings = ({ setSettings }) => {
  const [boardHeight, setBoardHeight] = useState(8);
  const [boardWidth, setBoardWidth] = useState(8);
  const [boardBombs, setBoardBombs] = useState(10);
  const [validationMessage, setValidationMessage] = useState("");

  const handleSetSettings = () => {
    let isValid = true;

    if (!boardHeight || !boardWidth || !boardBombs) {
      setValidationMessage("Fields cannot be empty or equal zero!");
      isValid = false;
    } else if (isValid && boardHeight * boardWidth < boardBombs) {
      setValidationMessage("Too much bombs.");
      isValid = false;
    }

    if (isValid) {
      setValidationMessage("");
      setSettings({
        height: boardHeight,
        width: boardWidth,
        bombs: boardBombs,
      });
    }
  };
  return (
    <div className="inputs-block">
      <h1>Board Settings</h1>
      <label htmlFor={boardHeight}>Board Height</label>
      <input
        id="boardHeight"
        type="number"
        defaultValue={boardHeight}
        onChange={(e) => setBoardHeight(e.target.valueAsNumber)}
      />

      <label htmlFor={boardWidth}>Board Width</label>
      <input
        id="boardWidth"
        type="number"
        defaultValue={boardWidth}
        onChange={(e) => setBoardWidth(e.target.valueAsNumber)}
      />

      <label htmlFor={boardBombs}>Bombs</label>
      <input
        id="bombs"
        type="number"
        defaultValue={boardBombs}
        onChange={(e) => setBoardBombs(e.target.valueAsNumber)}
      />
      <button className="btn" onClick={handleSetSettings}>
        Set settings
      </button>
      <p style={{ color: "red" }}>{validationMessage}</p>
    </div>
  );
};

export default Settings;
