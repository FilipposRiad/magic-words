import React from "react";
import { CSSTransition } from "react-transition-group";
import Character from "./Character";
import "./CharacterSelect.css";

export default function CharacterSelect(props) {
  const [currentCharacter, setCurrentCharacter] = React.useState("irmgard");
  const [playerOneCharacter, setPlayerOneCharacter] = React.useState("");
  const [playerTwoCharacter, setPlayerTwoCharacter] = React.useState("");
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
    if (!playerOneCharacter) {
      setPlayerOneCharacter(currentCharacter);
    } else if (!playerTwoCharacter) {
      setPlayerTwoCharacter(currentCharacter);
    } else {
      /* TODO: Start Game */
      return;
    }

    setCharacters((prevCharacters) =>
      prevCharacters.filter((char) => char !== currentCharacter)
    );

    nextCharacter();
  }

  return (
    <div className="character-select-screen">
      <CSSTransition
        in={playerOneCharacter !== ""}
        timeout={playerOneCharacter ? 3000 : 0}
        classNames="fade"
        unmountOnExit
      >
        <div className="selected-character-container">
          <div className="character-name-window">
            <h1>PLAYER 1: {playerOneCharacter.toUpperCase()}</h1>
          </div>
          <div className="character-select-section">
            <div className="character-window">
              <Character
                style={{ marginBottom: "100px" }}
                name={playerOneCharacter}
              />
            </div>
          </div>
        </div>
      </CSSTransition>

      <div className="character-select-container">
        <h1 className="instructions-message">
          {playerOneCharacter && playerTwoCharacter
            ? "START GAME"
            : "SELECT CHARACTER FOR PLAYER " +
              (!playerOneCharacter ? "ONE" : "TWO")}
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
            {playerOneCharacter && playerTwoCharacter ? "START GAME" : "SELECT"}
          </h1>
        </div>
      </div>

      <CSSTransition
        in={playerTwoCharacter !== ""}
        timeout={playerTwoCharacter ? 3000 : 0}
        classNames="fade"
        unmountOnExit
      >
        <div className="selected-character-container">
          <div className="character-name-window">
            <h1>PLAYER 2: {playerTwoCharacter.toUpperCase()}</h1>
          </div>
          <div className="character-select-section">
            <div className="character-window">
              <Character
                style={{ marginBottom: "100px" }}
                name={playerTwoCharacter}
              />
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
