import React from "react";
import "./MainMenu.css";

export default function MainMenu(props) {
  return (
    <div className="main-menu-container">
      <div className="logo-container">
        <img src="./src/assets/logo/magic.png" />
        <img src="./src/assets/logo/words.png" />
      </div>
      <div className="main-menu-options">
        <img
          src="./src/assets/interface/button_menu.png"
          onClick={() => props.setInGame(true)}
        />
        <img
          src="./src/assets/interface/window_scroll.png"
          style={{ width: "112px", height: "134px" }}
        />
      </div>
    </div>
  );
}
