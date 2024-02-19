import React from "react";
import "./Game.css";
import Character from "./Character";

export default function Game(props) {
  return (
    <div className="game-container">
      <div className="exit-btn">
        <img
          src="./src\assets\interface\arrow_left.png"
          onClick={() => props.setScreen("mainMenu")}
        />
      </div>

      <div className="monsters-container">
        <Character name="roasted_pig" />
      </div>

      <div className="characters-container">
        <Character name="tilda" />
        <Character name="irmgard" />
        <Character name="werner" />
        <Character name="ozok" />
      </div>
    </div>
  );
}
