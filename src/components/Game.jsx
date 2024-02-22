import React from "react";
import "./Game.css";
import Character from "./Character";

export default function Game(props) {
  return (
    <div className="game-container">
      <div className="menu-btn">
        <img
          src="./src\assets\interface\button_menu.png"
          onClick={() => props.setScreen("mainMenu")}
        />
      </div>

      <div className="monsters-container">
        <Character name="roasted_pig" />
      </div>

      <div className="characters-container">
        <Character name={props.playerOneCharacter} />
        <Character name={props.playerTwoCharacter} />
      </div>
    </div>
  );
}
