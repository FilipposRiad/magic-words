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

      var createdCards = [];
      randomWords.map((word) => {
        createdCards.push(<div className="card">{word.text}</div>);

        var translationCardContent = [];
        word.translations.forEach((translation) => {
          translationCardContent.push(
            <div className="translation">{translation.text}</div>
          );
        });

        createdCards.push(<div className="card">{translationCardContent}</div>);
      });

      setCards(randomizeCards(createdCards));
    }
  }

  function getRandomNumber(range) {
    return Math.round(Math.random() * range);
  }

  function getRandomWord() {
    return allWords[getRandomNumber(allWords.length)];
  }

  function randomizeCards(cardsToRandomize) {
    var randomizedCards = [];
    var usedIndices = [];

    while (randomizedCards.length != cardsToRandomize.length) {
      const index = getRandomNumber(cardsToRandomize.length - 1);

      if (!usedIndices.includes(index)) {
        randomizedCards.push(cardsToRandomize[index]);
        usedIndices.push(index);
      }
    }

    return randomizedCards;
  }

  return (
    <div className="game-memory-container">
      <div className="game-memory-grid" onClick={createCards}>
        {cards}
      </div>
    </div>
  );
}
