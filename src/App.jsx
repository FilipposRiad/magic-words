import React from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import GameMemory from "./components/GameMemory";
import CharacterSelect from "./components/CharacterSelect";
import Library from "./components/Library";
import Statistics from "./components/Statistics";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more if you dare! That's
//         incredible...
//       </p>
//     </>
//   );
// }

// export default App;

export default function App() {
  const [screen, setScreen] = React.useState("mainMenu");
  const [playerOneCharacter, setPlayerOneCharacter] = React.useState("");
  const [playerTwoCharacter, setPlayerTwoCharacter] = React.useState("");

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
        />
      </CSSTransition>

      <CSSTransition
        in={screen === "game-memory"}
        timeout={screen === "game-memory" ? 3000 : 0}
        classNames="fade"
        unmountOnExit
      >
        <GameMemory setScreen={setScreen} smallScreen={smallScreen} />
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
        <Statistics setScreen={setScreen} />
      </CSSTransition>
    </>
  );
}
