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

      <div className="speech-bubbles-container">
        <div style={{ position: "relative", width: "270px", height: "83px" }}>
          <img
            src=".\src\assets\tiles\speechbubble_wiz1.png"
            style={{ position: "absolute", top: "0", left: "0" }}
          />
          <textarea className="wizardSpeechBubble" />
          <img
            src="./src\assets\interface\CONFIRM_button.png"
            className="confirm"
          />
          <div className="checkmark-left">✅</div>
          <div className="crossmark-left">❎</div>
        </div>
        <div
          style={{
            position: "relative",
            width: "266px",
            height: "83px",
          }}
        >
          <img
            src=".\src\assets\tiles\speechbubble_wiz2.png"
            style={{ position: "absolute", top: "0", left: "0" }}
          />
          <textarea className="wizardSpeechBubble" />
          <div className="checkmark-right">✅</div>
          <div className="crossmark-right">❎</div>
        </div>
      </div>

      <div className="characters-container">
        <Character name={props.playerOneCharacter} />
        <Character name={props.playerTwoCharacter} />
      </div>
    </div>
  );
}
