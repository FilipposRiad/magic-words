import React from "react";
import "./GameMemory.css";

export default function GameMemory() {
  const [allWords, setAllWords] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [flippedCardGridIndices, setFlippedCardGridIndices] = React.useState(
    []
  );
  const [cardOneToCompareGridIndex, setCardOneToCompareGridIndex] =
    React.useState();
  const [cardTwoToCompareGridIndex, setCardTwoToCompareGridIndex] =
    React.useState();
  const [mismatchCounter, setMismatchCounter] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState();

  var faceDownCards = [];
  for (let i = 0; i < 16; i++) {
    faceDownCards.push(
      <div
        key={i}
        index={i}
        className="face-down-card"
        onClick={() => flipCard(i)}
      />
    );
  }

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

  function createCards(language = "Greek") {
    setCards([]);
    setFlippedCardGridIndices([]);
    setCardOneToCompareGridIndex(null);
    setCardTwoToCompareGridIndex(null);
    setMismatchCounter(0);
    setSelectedLanguage(language);

    if (allWords.length > 0) {
      var createdCards = [];
      var usedIndices = [];

      for (let i = 0; i < 8; i++) {
        var randomNumber = getRandomNumber(allWords.length - 1);

        while (
          usedIndices.includes(randomNumber) ||
          allWords[randomNumber].language != language
        ) {
          randomNumber = getRandomNumber(allWords.length - 1);
        }

        usedIndices.push(randomNumber);

        var currentWord = allWords[randomNumber];
        createdCards.push(
          <div key={currentWord.id} word_index={randomNumber} className="card">
            {currentWord.text}
          </div>
        );

        var translationCardContent = [];
        currentWord.translations.forEach((translation) => {
          translationCardContent.push(
            <div key={translation.text} className="translation">
              {translation.text}
            </div>
          );
        });

        createdCards.push(
          <div key={currentWord.translations[0].id} className="card">
            {translationCardContent}
          </div>
        );
      }

      setCards(randomizeCards(createdCards));
    }
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

  function getRandomNumber(range) {
    return Math.round(Math.random() * range);
  }

  function flipCard(gridIndex) {
    setFlippedCardGridIndices((prevFlippedCardGridIndices) => [
      ...prevFlippedCardGridIndices,
      gridIndex,
    ]);

    if (!cardOneToCompareGridIndex && cardOneToCompareGridIndex != 0) {
      setCardOneToCompareGridIndex(gridIndex);
    } else if (!cardTwoToCompareGridIndex && cardTwoToCompareGridIndex != 0) {
      setCardTwoToCompareGridIndex(gridIndex);
    } else {
      var wordOneIndex = cards[cardOneToCompareGridIndex].props.word_index;
      var wordTwoIndex = cards[cardTwoToCompareGridIndex].props.word_index;

      if (wordOneIndex && wordTwoIndex) {
        // Both selected cards are parent words (no translation selected)
        setMismatchCounter((prevMismatchCounter) => prevMismatchCounter + 1);
        hideComparisonCards();
      } else if (!wordOneIndex && !wordTwoIndex) {
        // Both selected cards are translations (no parent word selected)
        setMismatchCounter((prevMismatchCounter) => prevMismatchCounter + 1);
        hideComparisonCards();
      } else {
        // Selected a parent word and a translation. As such, comparison now is required
        const originalWord =
          allWords[wordOneIndex ? wordOneIndex : wordTwoIndex];

        const translationRef =
          allWords.indexOf(originalWord) == wordOneIndex
            ? cards[cardTwoToCompareGridIndex].props.children[0].props.children
            : cards[cardOneToCompareGridIndex].props.children[0].props.children;

        if (
          !originalWord.translations.some(
            (translation) => translation.text == translationRef
          )
        ) {
          // Parent word was not the right match for the selected translation
          setMismatchCounter((prevMismatchCounter) => prevMismatchCounter + 1);
          hideComparisonCards();
        }
      }

      setCardOneToCompareGridIndex(gridIndex);
      setCardTwoToCompareGridIndex(null);
    }
  }

  function hideComparisonCards() {
    setFlippedCardGridIndices((prevFlippedCardGridIndices) => [
      ...prevFlippedCardGridIndices.filter(
        (i) => i != cardOneToCompareGridIndex && i != cardTwoToCompareGridIndex
      ),
    ]);
  }

  function displayCards() {
    var cardsToDisplay = [];
    for (let i = 0; i < 16; i++) {
      cardsToDisplay.push(
        flippedCardGridIndices.includes(i) ? cards[i] : faceDownCards[i]
      );
    }

    return cardsToDisplay;
  }

  async function postStatistics(data = {}) {
    const response = await fetch("http://localhost:3000/memoryGameStatistics", {
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
    });
    return response.json();
  }

  if (flippedCardGridIndices.length === 16) {
    // Player matched all cards
    postStatistics({
      mismatches: mismatchCounter,
      language: selectedLanguage,
    });
    // .then((response) => {
    //   console.log(response);
    // });
  }

  return (
    <div className="game-memory-container">
      <img
        src="./src\assets\memory\germany_flag.webp"
        className="flag-ger"
        onClick={() => createCards("German")}
      />
      <div>
        <h3 className="mismatch-counter">Mismatches: {mismatchCounter}</h3>
        <div className="game-memory-grid">{displayCards()}</div>
      </div>

      <img
        src="./src\assets\memory\greece_flag.png"
        className="flag-gr"
        onClick={() => createCards("Greek")}
      />
    </div>
  );
}
