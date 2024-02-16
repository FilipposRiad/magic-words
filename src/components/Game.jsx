import React from "react";
import "./Game.css";
import Character from "./Character";

export default function Game() {
  return (
    <div className="game-container">
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
