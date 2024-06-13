import React from "react";
import "./Game.css";
import Character from "./Character";

export default function Game(props) {
  const [germanWords, setGermanWords] = React.useState([]);
  const [greekWords, setGreekWords] = React.useState([]);
  const [turn, setTurn] = React.useState("playerOne");
  const [playerOneChallengeWord, setPlayerOneChallengeWord] = React.useState();
  const [playerTwoChallengeWord, setPlayerTwoChallengeWord] = React.useState();
  const [playerOneAnswer, setPlayerOneAnswer] = React.useState("");
  const [playerTwoAnswer, setPlayerTwoAnswer] = React.useState("");
  const [playerOneScore, setPlayerOneScore] = React.useState(0);
  const [playerTwoScore, setPlayerTwoScore] = React.useState(0);
  const [playerOneLives, setPlayerOneLives] = React.useState(5);
  const [playerTwoLives, setPlayerTwoLives] = React.useState(5);
  const [usedWords, setUsedWords] = React.useState([]);

  React.useEffect(() => {
    getAllWords();
  }, []);

  React.useEffect(() => {
    setupGame();
  }, [germanWords]);

  React.useEffect(() => {
    if (playerOneLives == 0 || playerTwoLives == 0) {
      updateWordsStatistics({
        ids: usedWords.map((w) => w.id),
      });
    }
  }, [playerOneLives, playerTwoLives]);

  function getAllWords() {
    fetch(props.backendIPAddress + "/words/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setGermanWords(
          json
            .filter((w) => w.language === "German")
            .sort(
              (a, b) =>
                a.statistics.timesEncountered - b.statistics.timesEncountered
            )
        );

        setGreekWords(
          json
            .filter((w) => w.language === "Greek")
            .sort(
              (a, b) =>
                a.statistics.timesEncountered - b.statistics.timesEncountered
            )
        );
      });
  }

  function setupGame() {
    setPlayerOneChallengeWord(germanWords[0]);
  }

  function setNextTurn() {
    switch (turn) {
      case "playerOne":
        validateWords(turn);
        setTurn("playerTwo");
        break;
      case "playerTwo":
        validateWords(turn);
        setTurn("playerOne");
        break;
    }
  }

  function validateWords(turn) {
    switch (turn) {
      case "playerOne":
        if (
          playerOneChallengeWord.translations
            .map((t) => t.text.toLowerCase())
            .includes(playerOneAnswer.toLowerCase())
        ) {
          setPlayerOneScore((prevScore) => prevScore + 1);
        } else {
          setPlayerOneLives((prevLives) => prevLives - 1);
        }

        setPlayerTwoChallengeWord(
          greekWords[
            playerTwoChallengeWord
              ? greekWords.indexOf(playerTwoChallengeWord) + 1
              : 0
          ]
        );
        setPlayerTwoAnswer("");
        setUsedWords((prevWords) => [...prevWords, playerOneChallengeWord]);
        break;

      case "playerTwo":
        if (
          playerTwoChallengeWord.translations
            .map((t) => t.text.toLowerCase())
            .includes(playerTwoAnswer.toLowerCase())
        ) {
          setPlayerTwoScore((prevScore) => prevScore + 1);
        } else {
          setPlayerTwoLives((prevLives) => prevLives - 1);
        }

        setPlayerOneChallengeWord(
          germanWords[germanWords.indexOf(playerOneChallengeWord) + 1]
        );
        setPlayerOneAnswer("");
        setUsedWords((prevWords) => [...prevWords, playerTwoChallengeWord]);
        break;
    }
  }

  async function updateWordsStatistics(data = {}) {
    const response = await fetch(
      props.backendIPAddress + "/words/updateWordsStatistics",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      }
    );
    return response.json();
  }

  return (
    <div
      className="game-container"
      style={{
        zoom: props.smallScreen ? "80%" : "100%",
        height: props.smallScreen ? "100%" : "calc(100vh - 60px)",
      }}
    >
      <div className="menu-btn">
        <img
          src="./src\assets\interface\button_menu_2.png"
          onClick={() => props.setScreen("mainMenu")}
        />
      </div>

      <div
        className="game-end-container"
        style={{
          display: playerOneLives == 0 || playerTwoLives == 0 ? "flex" : "none",
        }}
      >
        <img
          src="./src\assets\interface\bar_large.png"
          className="game-end-img"
        />
        <div className="game-end-message">
          {playerOneLives == 0
            ? props.playerTwoCharacter.toUpperCase()
            : props.playerOneCharacter.toUpperCase()}{" "}
          WINS!
        </div>
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
            opacity: turn.toLowerCase().includes("playerone") ? "1" : "0.65",
          }}
        >
          <img
            src=".\src\assets\tiles\speechbubble_monster_left.png"
            className="speech-bubble-img"
          />
          <div className="monster-speech-bubble">
            {turn.toLowerCase().includes("playerone")
              ? playerOneChallengeWord?.text
              : playerOneChallengeWord?.translations
                  .map((t) => t.text)
                  .join(", ")}
          </div>
        </div>
        <div
          className="speech-bubble-right"
          style={{
            opacity: turn.toLowerCase().includes("playertwo") ? "1" : "0.65",
          }}
        >
          <img
            src=".\src\assets\tiles\speechbubble_monster_right.png"
            className="speech-bubble-img"
          />
          <div className="monster-speech-bubble">
            {turn.toLowerCase().includes("playertwo")
              ? playerTwoChallengeWord?.text
              : playerTwoChallengeWord?.translations
                  .map((t) => t.text)
                  .join(", ")}
          </div>
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
            value={playerOneAnswer}
            onChange={(event) => setPlayerOneAnswer(event.target.value)}
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
            value={playerTwoAnswer}
            onChange={(event) => setPlayerTwoAnswer(event.target.value)}
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
      <div className="score-container">
        <div>
          SCORE: {playerOneScore} | LIVES: {playerOneLives}
        </div>
        <div>
          SCORE: {playerTwoScore} | LIVES: {playerTwoLives}
        </div>
      </div>
    </div>
  );
}
