import { useState } from "react";
import "./App.scss";
import Board from "./Board";
import Settings from "./Settings";

function App() {
  const [boardSetting, setBoardSettings] = useState({
    height: 6,
    width: 6,
    bombs: 7,
  });

  const setSettings = (settings) => {
    setBoardSettings(settings);
  };

  return (
    <div className="app">
      <Settings setSettings={setSettings} />
      <Board boardSetting={boardSetting} />
    </div>
  );
}

export default App;
