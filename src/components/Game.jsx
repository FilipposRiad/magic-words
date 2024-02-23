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
          src="./src\assets\interface\button_menu.png"
          onClick={() => props.setScreen("mainMenu")}
        />
      </div>

      <div className="monsters-container">
        <Character name="roasted_pig" />
      </div>

      <div className="speech-bubbles-container">
        <div
          style={{
            position: "relative",
            width: "270px",
            height: "83px",
            opacity: turn.toLowerCase().includes("playerone") ? "1" : "0.65",
          }}
        >
          <img
            src=".\src\assets\tiles\speechbubble_wiz1.png"
            style={{ position: "absolute", top: "0", left: "0" }}
          />
          <textarea
            disabled={turn !== "playerOne"}
            value={playerOneWords}
            onChange={(event) => setPlayerOneWords(event.target.value)}
            className="wizardSpeechBubble"
          />
          {turn === "playerOne" && (
            <img
              src="./src\assets\interface\CONFIRM_button.png"
              className="confirm-left"
              onClick={() => setNextTurn()}
            />
          )}
          {turn === "validatePlayerOneWords" && (
            <div className="checkmark-left" onClick={() => validateWords(true)}>
              ✅
            </div>
          )}
          {turn === "validatePlayerOneWords" && (
            <div
              className="crossmark-left"
              onClick={() => validateWords(false)}
            >
              ❎
            </div>
          )}
        </div>
        <div
          style={{
            position: "relative",
            width: "266px",
            height: "83px",
            opacity: turn.toLowerCase().includes("playertwo") ? "1" : "0.65",
          }}
        >
          <img
            src=".\src\assets\tiles\speechbubble_wiz2.png"
            style={{ position: "absolute", top: "0", left: "0" }}
          />
          <textarea
            disabled={turn !== "playerTwo"}
            value={playerTwoWords}
            onChange={(event) => setPlayerTwoWords(event.target.value)}
            className="wizardSpeechBubble"
          />
          {turn === "playerTwo" && (
            <img
              src="./src\assets\interface\CONFIRM_button.png"
              className="confirm-right"
              onClick={() => setNextTurn()}
            />
          )}
          {turn === "validatePlayerTwoWords" && (
            <div
              className="checkmark-right"
              onClick={() => validateWords(true)}
            >
              ✅
            </div>
          )}
          {turn === "validatePlayerTwoWords" && (
            <div
              className="crossmark-right"
              onClick={() => validateWords(false)}
            >
              ❎
            </div>
          )}
        </div>
      </div>

      <div className="characters-container">
        <Character name={props.playerOneCharacter} />
        <Character name={props.playerTwoCharacter} />
      </div>
    </div>
  );
}
