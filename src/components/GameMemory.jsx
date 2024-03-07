import React from "react";
import "./GameMemory.css";

export default function GameMemory() {
  const [allWords, setAllWords] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [flippedCards, setFlippedCards] = React.useState([]);

  const [cardOneToCompare, setCardOneToCompare] = React.useState();
  const [cardTwoToCompare, setCardTwoToCompare] = React.useState();

  const emptyCards = [
    <div
      key={0}
      index={0}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={1}
      index={1}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={2}
      index={2}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={3}
      index={3}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={4}
      index={4}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={5}
      index={5}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={6}
      index={6}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={7}
      index={7}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={8}
      index={8}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={9}
      index={9}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={10}
      index={10}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={11}
      index={11}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={12}
      index={12}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={13}
      index={13}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={14}
      index={14}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
    <div
      key={15}
      index={15}
      className="empty-card"
      onClick={(event) => flipCard(event.target.getAttribute("index"))}
    />,
  ];

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

  function flipCard(index) {
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, index]);

    if (!cardOneToCompare) {
      console.log("SET CARD ONE");
      setCardOneToCompare(index);
    } else if (!cardTwoToCompare) {
      console.log("SET CARD TWO");
      setCardTwoToCompare(index);
    } else {
      var wordOneIndex = cards[cardOneToCompare].props.word_index;
      var wordTwoIndex = cards[cardTwoToCompare].props.word_index;

      // console.log(
      //   cards[cardOneToCompare].props.children[0].props.children,
      //   cards[cardTwoToCompare]
      // );

      if (wordOneIndex && wordTwoIndex) {
        console.log("NO TRANSLATIONS!");
        clearComparisonCards();
      } else if (!wordOneIndex && !wordTwoIndex) {
        console.log("BOTH TRANSLATIONS!");
        clearComparisonCards();
      } else {
        console.log("COMPARING!");
        const originalWord =
          allWords[wordOneIndex ? wordOneIndex : wordTwoIndex];

        const translationRef =
          allWords.indexOf(originalWord) == wordOneIndex
            ? cards[cardTwoToCompare].props.children[0].props.children
            : cards[cardOneToCompare].props.children[0].props.children;
        console.log(originalWord, translationRef);
        if (
          originalWord.translations.some(
            (translation) => translation.text == translationRef
          )
        ) {
          console.log("MATCH!");
        } else {
          console.log("NO MATCH!");
          clearComparisonCards();
        }
      }

      setCardOneToCompare(index);
      setCardTwoToCompare(null);
    }
  }

  function clearComparisonCards() {
    setFlippedCards((prevFlippedCards) => [
      ...prevFlippedCards.filter(
        (a) => a != cardOneToCompare && a != cardTwoToCompare
      ),
    ]);
  }

  function displayCards() {
    var cardsToDisplay = [];
    for (let i = 0; i < 16; i++) {
      cardsToDisplay.push(
        flippedCards.includes(i.toString()) ? cards[i] : emptyCards[i]
      );
    }
    return cardsToDisplay;
  }

  function createCards() {
    if (allWords.length > 0) {
      var createdCards = [];
      var usedIndices = [];

      for (let i = 0; i < 8; i++) {
        var randomNumber = getRandomNumber(allWords.length - 1);

        while (usedIndices.includes(randomNumber)) {
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

  function getRandomNumber(range) {
    return Math.round(Math.random() * range);
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
      <div className="game-memory-grid">{displayCards()}</div>
    </div>
  );
}
