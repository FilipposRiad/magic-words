import React from "react";
import { CSSTransition } from "react-transition-group";
import Character from "./Character";
import "./CharacterSelect.css";

export default function CharacterSelect(props) {
  const [currentCharacter, setCurrentCharacter] = React.useState("irmgard");
  const [characters, setCharacters] = React.useState([
    "irmgard",
    "ozok",
    "tilda",
    "werner",
    "raagz",
  ]);

  function nextCharacter() {
    const currentIndex = characters.indexOf(currentCharacter);
    const nextCharacter =
      currentIndex + 1 < characters.length
        ? characters[currentIndex + 1]
        : characters[0];
    setCurrentCharacter(nextCharacter);
  }

  function previousCharacter() {
    const currentIndex = characters.indexOf(currentCharacter);
    const previousCharacter =
      currentIndex - 1 >= 0
        ? characters[currentIndex - 1]
        : characters[characters.length - 1];
    setCurrentCharacter(previousCharacter);
  }

  function selectCharacter() {
    if (!props.playerOneCharacter || !props.playerTwoCharacter) {
      setCharacters((prevCharacters) =>
        prevCharacters.filter((char) => char !== currentCharacter)
      );

      nextCharacter();
    }

    props.handleCharacterSelect(currentCharacter);
  }

  return (
    <div
      className="character-select-screen"
      style={{ zoom: props.smallScreen ? "78%" : "100%" }}
    >
      <CSSTransition
        in={props.playerOneCharacter !== ""}
        timeout={props.playerOneCharacter ? 3000 : 0}
        classNames="fade"
        unmountOnExit
      >
        <div className="selected-character-container">
          <div className="character-name-window">
            <h1>PLAYER 1: {props.playerOneCharacter.toUpperCase()}</h1>
          </div>
          <div className="character-select-section">
            <div className="character-window">
              <Character
                style={{ marginBottom: "100px" }}
                name={props.playerOneCharacter}
              />
            </div>
          </div>
        </div>
      </CSSTransition>

      <div className="character-select-container">
        <h1 className="instructions-message">
          {props.playerOneCharacter && props.playerTwoCharacter
            ? "START GAME"
            : "SELECT CHARACTER FOR PLAYER " +
              (!props.playerOneCharacter ? "ONE" : "TWO")}
        </h1>
        <div className="character-name-window">
          <h1>{currentCharacter.toUpperCase()}</h1>
        </div>
        <div className="character-select-section">
          <img
            src=".\src\assets\interface\arrow_left.png"
            className="arrow-left"
            onClick={previousCharacter}
          />
          <div className="character-window">
            <Character
              style={{ marginBottom: "100px" }}
              name={currentCharacter}
            />
          </div>
          <img
            src=".\src\assets\interface\arrow_right.png"
            className="arrow-right"
            onClick={nextCharacter}
          />
        </div>
        <div className="select-character-button" onClick={selectCharacter}>
          <h1>
            {props.playerOneCharacter && props.playerTwoCharacter
              ? "START GAME"
              : "SELECT"}
          </h1>
        </div>
      </div>

      <CSSTransition
        in={props.playerTwoCharacter !== ""}
        timeout={props.playerTwoCharacter ? 3000 : 0}
        classNames="fade"
        unmountOnExit
      >
        <div className="selected-character-container">
          <div className="character-name-window">
            <h1>PLAYER 2: {props.playerTwoCharacter.toUpperCase()}</h1>
          </div>
          <div className="character-select-section">
            <div className="character-window">
              <Character
                style={{ transform: "scaleX(-1)", marginBottom: "100px" }}
                name={props.playerTwoCharacter}
              />
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
