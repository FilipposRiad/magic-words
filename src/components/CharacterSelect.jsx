import React from "react";
import Character from "./Character";
import "./CharacterSelect.css";

export default function CharacterSelect(props) {
  const [character, setCharacter] = React.useState("irmgard");
  const characters = ["irmgard", "ozok", "tilda", "werner", "raagz"];

  function nextCharacter() {
    const currentIndex = characters.indexOf(character);
    const nextCharacter =
      currentIndex + 1 < characters.length
        ? characters[currentIndex + 1]
        : characters[0];
    setCharacter(nextCharacter);
  }

  function previousCharacter() {
    const currentIndex = characters.indexOf(character);
    const previousCharacter =
      currentIndex - 1 >= 0
        ? characters[currentIndex - 1]
        : characters[characters.length - 1];
    setCharacter(previousCharacter);
  }

  return (
    <div className="character-select-container">
      <div className="character-name-window">
        <h1 className="character-name">{character.toUpperCase()}</h1>
      </div>
      <div className="character-select-section">
        <img
          src=".\src\assets\interface\arrow_left.png"
          className="arrow-left"
          onClick={previousCharacter}
        />
        <div className="character-window">
          <Character style={{ marginBottom: "100px" }} name={character} />
        </div>
        <img
          src=".\src\assets\interface\arrow_right.png"
          className="arrow-right"
          onClick={nextCharacter}
        />
      </div>
    </div>
  );
}
