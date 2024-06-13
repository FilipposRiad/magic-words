import React from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import GameMemory from "./components/GameMemory";
import CharacterSelect from "./components/CharacterSelect";
// import Library from "./components/Library";
import Statistics from "./components/Statistics";

export default function App() {
  const [screen, setScreen] = React.useState("mainMenu");
  const [playerOneCharacter, setPlayerOneCharacter] = React.useState("");
  const [playerTwoCharacter, setPlayerTwoCharacter] = React.useState("");
  const backendIPAddress = "http://localhost:3000";

  if (screen == "mainMenu" && (playerOneCharacter || playerTwoCharacter)) {
    setPlayerOneCharacter("");
    setPlayerTwoCharacter("");
  }

  function handleCharacterSelect(character) {
    if (!playerOneCharacter) {
      setPlayerOneCharacter(character);
    } else if (!playerTwoCharacter) {
      setPlayerTwoCharacter(character);
    } else {
      setScreen("game");
      return;
    }
  }

  const smallScreen = window.innerWidth <= 1536 || window.innerHeight <= 472;

  return (
    <>
      <CSSTransition
        in={screen === "mainMenu"}
        timeout={screen === "mainMenu" ? 3000 : 0}
        classNames="fade"
        unmountOnExit
      >
        <MainMenu setScreen={setScreen} />
      </CSSTransition>

      <CSSTransition
        in={screen === "characterSelect"}
        timeout={screen === "characterSelect" ? 3000 : 0}
        classNames="fade"
        unmountOnExit
      >
        <CharacterSelect
          playerOneCharacter={playerOneCharacter}
          playerTwoCharacter={playerTwoCharacter}
          handleCharacterSelect={handleCharacterSelect}
          smallScreen={smallScreen}
        />
      </CSSTransition>

      <CSSTransition
        in={screen === "game"}
        timeout={screen === "game" ? 3000 : 0}
        classNames="fade"
        unmountOnExit
      >
        <Game
          setScreen={setScreen}
          playerOneCharacter={playerOneCharacter}
          playerTwoCharacter={playerTwoCharacter}
          smallScreen={smallScreen}
          backendIPAddress={backendIPAddress}
        />
      </CSSTransition>

      <CSSTransition
        in={screen === "game-memory"}
        timeout={screen === "game-memory" ? 3000 : 0}
        classNames="fade"
        unmountOnExit
      >
        <GameMemory
          setScreen={setScreen}
          smallScreen={smallScreen}
          backendIPAddress={backendIPAddress}
        />
      </CSSTransition>

      {/* <CSSTransition
        in={screen === "library"}
        timeout={screen === "library" ? 3000 : 0}
        classNames="fade"
        unmountOnExit
      >
        <Library setScreen={setScreen} />
      </CSSTransition> */}

      <CSSTransition
        in={screen === "statistics"}
        timeout={screen === "statistics" ? 3000 : 0}
        classNames="fade"
        unmountOnExit
      >
        <Statistics setScreen={setScreen} backendIPAddress={backendIPAddress} />
      </CSSTransition>
    </>
  );
}
