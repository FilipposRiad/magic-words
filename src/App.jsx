import React from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";

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
  const [inGame, setInGame] = React.useState(false);

  return (
    <>
      <CSSTransition in={!inGame} timeout={500} classNames="fade" unmountOnExit>
        <MainMenu setInGame={setInGame} />
      </CSSTransition>

      <CSSTransition in={inGame} timeout={5000} classNames="fade" unmountOnExit>
        <Game setInGame={setInGame} />
      </CSSTransition>
    </>
  );
}
