import React from "react";
import "./MainMenu.css";

export default function MainMenu(props) {
  var clickAudio = new Audio("./src/assets/audio/button.mp3");

  return (
    <div className="main-menu-container">
      <div className="menu-buttons-grid">
        <div
          className="menu-button"
          onClick={() => {
            props.setScreen("characterSelect");
            clickAudio.play();
          }}
        >
          VERSUS GAME
        </div>
        <div
          className="menu-button"
          onClick={() => {
            props.setScreen("game-memory");
            clickAudio.play();
          }}
        >
          MEMORY GAME
        </div>
        <div
          className="menu-button"
          onClick={() => {
            clickAudio.play();
          }}
        >
          <div>LIBRARY</div>
          <div className="under-construction">(UNDER CONSTRUCTION)</div>
        </div>
        <div
          className="menu-button"
          onClick={() => {
            props.setScreen("statistics");
            clickAudio.play();
          }}
        >
          STATISTICS
        </div>
      </div>
      <img
        src="./src/assets/main_menu/floaty_house.png"
        className="floaty_house"
      />
    </div>
  );
}
