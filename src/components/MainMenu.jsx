import React from "react";
import "./MainMenu.css";

export default function MainMenu(props) {
  return (
    <div className="main-menu-container">
      <div className="logo-container">
        <img src="./src/assets/logo/logo.png" />
      </div>
      <div className="main-menu-options">
        <img
          src="./src/assets/main_menu/title_castle.png"
          onClick={() => props.setScreen("game")}
          className="castle"
        />
        <img
          src="./src/assets/main_menu/title_library.png"
          onClick={() => props.setScreen("characterSelect")}
          className="library"
        />
      </div>
    </div>
  );
}
