import React from "react";
import "./MainMenu.css";

export default function MainMenu(props) {
  var clickAudio = new Audio("./src/assets/audio/button.mp3");

  return (
    <div className="main-menu-container">
      <img src="./src/assets/logo/logo.png" />
      <img
        src="./src/assets/main_menu/title_castle.png"
        onClick={() => props.setScreen("characterSelect")}
        className="castle"
      />
      <img
        src="./src/assets/main_menu/title_library.png"
        onClick={() => {
          props.setScreen("game-memory");
          clickAudio.play();
        }}
        className="library"
      />
    </div>
  );
}
