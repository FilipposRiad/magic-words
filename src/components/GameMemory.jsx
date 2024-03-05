import React from "react";
import "./GameMemory.css";

export default function GameMemory() {
  const [allWords, setAllWords] = React.useState([]);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/words/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setAllWords(json);
      });
  }, []);

  React.useEffect(() => {
    createCards();
  }, [allWords]);

  function createCards() {
    if (allWords.length > 0) {
      var randomWords = [];

      for (let i = 0; i < 8; i++) {
        randomWords.push(getRandomWord());
      }

      var cards = randomWords.map((word) => {
        return <div className="card">{word.text}</div>;
      });

      randomWords.map((word) => {
        var cardContent = [];

        word.translations.forEach((translation) => {
          cardContent.push(
            <div
              className="translation"
              // style={{ fontSize: word.translations.length > 5 ? "12px" : "" }}
            >
              {translation.text}
            </div>
          );
        });

        cards.push(<div className="card">{cardContent}</div>);
      });

      setCards(cards);
    }
  }

  function getRandomWord() {
    var randomNumber = Math.ceil(Math.random() * allWords.length);
    return allWords[randomNumber];
  }

  return (
    <div className="game-memory-container">
      <div className="game-memory-grid" onClick={createCards}>
        {cards}
      </div>
    </div>
  );
}
