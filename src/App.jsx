import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import Character from "./Character";

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
  const [render, setRender] = React.useState(true);
  console.log(render);

  return (
    <div className="main-container">
      <div className="logo-container">
        <img
          src="./src/assets/logo/magic.png"
          onClick={() => setRender((prevRender) => !prevRender)}
        />
        <img src="./src/assets/logo/words.png" />
      </div>
      {/* <div className="menu-container">
        <img src="./src/assets/interface/button_menu.png" />
      </div> */}
      <div className="monsters-container">
        <Character name="roasted_pig" />
      </div>
      <CSSTransition in={render} timeout={500} classNames="fade" unmountOnExit>
        <div className="characters-container">
          <Character name="tilda" />
          <Character name="irmgard" />
          <Character name="werner" />
          <Character name="ozok" />
        </div>
      </CSSTransition>
    </div>
  );
}
