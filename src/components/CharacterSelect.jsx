import React from "react";
import Character from "./Character";
import "./CharacterSelect.css";

export default function CharacterSelect(props) {
  return (
    <div className="character-select-container">
      <div className="character-name-window">
        <h1>OZOK</h1>
      </div>
      <div className="character-select-section">
        <img
          src=".\src\assets\interface\arrow_left.png"
          className="arrow-left"
        />
        <div className="character-window">
          <Character style={{ marginBottom: "100px" }} name="ozok" />
        </div>
        <img
          src=".\src\assets\interface\arrow_right.png"
          className="arrow-right"
        />
      </div>
    </div>
  );
}
