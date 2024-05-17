import React from "react";
import "./Game.css";
import Character from "./Character";

export default function Game(props) {
  const [turn, setTurn] = React.useState("playerOne");
  const [playerOneWords, setPlayerOneWords] = React.useState("");
  const [playerTwoWords, setPlayerTwoWords] = React.useState("");

  function setNextTurn() {
    switch (turn) {
      case "playerOne":
        if (!playerTwoWords) {
          setTurn("playerTwo");
        } else {
          setTurn("validatePlayerOneWords");
        }
        break;
      case "playerTwo":
        if (!playerOneWords) {
          setTurn("playerOne");
        } else {
          setTurn("validatePlayerTwoWords");
        }
        break;
    }
  }

  function validateWords(valid) {
    switch (turn) {
      case "validatePlayerOneWords":
        setPlayerOneWords("");
        setPlayerTwoWords("");
        setTurn("playerOne");
        break;
      case "validatePlayerTwoWords":
        setPlayerOneWords("");
        setPlayerTwoWords("");
        setTurn("playerTwo");
        break;
    }
  }

  return (
    <div className="game-container">
      <div className="menu-btn">
        <img
          src="./src\assets\interface\button_menu_2.png"
          onClick={() => props.setScreen("mainMenu")}
        />
      </div>

      <div className="monsters-container">
        <Character
          name="roasted_pig"
          style={{
            transform: turn.toLowerCase().includes("playerone")
              ? "scaleX(1)"
              : "scaleX(-1)",
          }}
        />
      </div>

      <div className="monster-speech-bubbles-container">
        <div
          className="speech-bubble-left"
          style={{
            visibility: turn.toLowerCase().includes("playerone")
              ? "visible"
              : "hidden",
          }}
        >
          <img
            src=".\src\assets\tiles\speechbubble_monster_left.png"
            className="speech-bubble-img"
          />
          <textarea
            disabled={true}
            value={playerOneWords}
            className="monster-speech-bubble"
          />
        </div>
        <div
          className="speech-bubble-right"
          style={{
            visibility: turn.toLowerCase().includes("playertwo")
              ? "visible"
              : "hidden",
          }}
        >
          <img
            src=".\src\assets\tiles\speechbubble_monster_right.png"
            className="speech-bubble-img"
          />
          <textarea
            disabled={true}
            value={playerTwoWords}
            className="monster-speech-bubble"
          />
        </div>
      </div>

      <div className="speech-bubbles-container">
        <div
          className="speech-bubble-left"
          style={{
            opacity: turn.toLowerCase().includes("playerone") ? "1" : "0.65",
          }}
        >
          <img
            src=".\src\assets\tiles\speechbubble_wiz1.png"
            className="speech-bubble-img"
          />
          <textarea
            disabled={turn !== "playerOne"}
            value={playerOneWords}
            onChange={(event) => setPlayerOneWords(event.target.value)}
            className="wizard-speech-bubble"
          />
          {turn === "playerOne" && (
            <img
              src="./src\assets\interface\CONFIRM_button.png"
              className="confirm-left"
              onClick={() => setNextTurn()}
            />
          )}
        </div>
        <div
          className="speech-bubble-right"
          style={{
            opacity: turn.toLowerCase().includes("playertwo") ? "1" : "0.65",
          }}
        >
          <img
            src=".\src\assets\tiles\speechbubble_wiz2.png"
            className="speech-bubble-img"
          />
          <textarea
            disabled={turn !== "playerTwo"}
            value={playerTwoWords}
            onChange={(event) => setPlayerTwoWords(event.target.value)}
            className="wizard-speech-bubble"
          />
          {turn === "playerTwo" && (
            <img
              src="./src\assets\interface\CONFIRM_button.png"
              className="confirm-right"
              onClick={() => setNextTurn()}
            />
          )}
        </div>
      </div>

      <div className="characters-container">
        <Character name={props.playerOneCharacter} />
        <Character
          name={props.playerTwoCharacter}
          style={{ transform: "scaleX(-1)" }}
        />
      </div>
    </div>
  );
}
