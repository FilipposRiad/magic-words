import React from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import CharacterSelect from "./components/CharacterSelect";

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
        <CharacterSelect setScreen={setScreen} />
      </CSSTransition>

      <CSSTransition
        in={screen === "game"}
        timeout={screen === "game" ? 3000 : 0}
        classNames="fade"
        unmountOnExit
      >
        <Game setScreen={setScreen} />
      </CSSTransition>
    </>
  );
}
