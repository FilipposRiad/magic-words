import React from "react";
import "./GameMemory.css";
import Confetti from "react-confetti";
import { Word, MemoryGameStatistics } from "../interfaces";

export default function GameMemory(props) {
  const [allWords, setAllWords] = React.useState<Word[]>([]);
  const [cards, setCards] = React.useState<React.JSX.Element[]>([]);
  const [flippedCardGridIndices, setFlippedCardGridIndices] = React.useState<
    number[]
  >([]);
  const [cardOneToCompareGridIndex, setCardOneToCompareGridIndex] =
    React.useState<any>();
  const [cardTwoToCompareGridIndex, setCardTwoToCompareGridIndex] =
    React.useState<any>();
  const [mismatchCounter, setMismatchCounter] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState("German");
  const [prevGames, setPrevGames] = React.useState<MemoryGameStatistics[]>([]);
  const [prevGermanGamesDetails, setPrevGermanGamesDetails] = React.useState<
    React.JSX.Element[]
  >([]);
  const [prevGreekGamesDetails, setPrevGreekGamesDetails] = React.useState<
    React.JSX.Element[]
  >([]);

  var faceDownCards: React.JSX.Element[] = [];
  for (let i = 0; i < 16; i++) {
    faceDownCards.push(
      <div key={i} className="face-down-card" onClick={() => flipCard(i)} />
    );
  }

  React.useEffect(() => {
    getAllWords();
    getPrevGames();
  }, []);

  React.useEffect(() => {
    createCards();
  }, [allWords]);

  React.useEffect(() => {
    createPrevGamesDetails();
  }, [prevGames]);

  React.useEffect(() => {
    // If the game ended (all cards are flipped), post game statistics to the backend and update word statistics
    if (flippedCardGridIndices.length === 16) {
      // Player matched all cards
      postGameStatistics({
        mismatches: mismatchCounter,
        language: selectedLanguage,
      });
      // .then((response) => {
      //   console.log(response);
      // });

      // When a card has a word_index it means that it is a card of a word and not its translation
      updateWordsStatistics({
        ids: cards
          .filter((c) => c.props.word_index !== undefined)
          .map((w) => w.key),
      });
      // .then((response) => console.log(response));
    }
  }, [flippedCardGridIndices]);

  function getAllWords() {
    fetch(props.backendIPAddress + "/words/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setAllWords(json);
      });
  }

  function getPrevGames() {
    fetch(props.backendIPAddress + "/memoryGameStatistics/latest", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setPrevGames(json);
      });
  }

  function newGame(language) {
    setFlippedCardGridIndices([]);
    setSelectedLanguage(language);
    setCards([]);
    setCardOneToCompareGridIndex(null);
    setCardTwoToCompareGridIndex(null);
    setMismatchCounter(0);
    getAllWords();
    getPrevGames();
  }

  function createPrevGamesDetails() {
    var germanGamesDetails: React.JSX.Element[] = [];
    var greekGameDetails: React.JSX.Element[] = [];

    const formatter = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    for (let prevGameDetails of prevGames.filter(
      (a) => a.language == "German"
    )) {
      const date = new Date(prevGameDetails.date);
      const formattedDate = formatter.format(date);

      germanGamesDetails.push(
        <div key={prevGameDetails.id} className="prev-game-details">
          {formattedDate} - Mismatches: {prevGameDetails.mismatches}
        </div>
      );
    }

    for (let prevGameDetails of prevGames.filter(
      (a) => a.language == "Greek"
    )) {
      const date = new Date(prevGameDetails.date);
      const formattedDate = formatter.format(date);

      greekGameDetails.push(
        <div key={prevGameDetails.id} className="prev-game-details">
          {formattedDate} - Mismatches: {prevGameDetails.mismatches}
        </div>
      );
    }

    setPrevGermanGamesDetails(germanGamesDetails);
    setPrevGreekGamesDetails(greekGameDetails);
  }

  function createCards() {
    if (allWords.length > 0) {
      var createdCards: any = [];
      var usedIndices: number[] = [];

      var maxTimesEncountered = Math.max.apply(
        null,
        allWords
          .filter((w) => w.statistics != null && w.language == selectedLanguage)
          .map((w) => w.statistics.timesEncountered)
      );

      var availableWords = allWords.filter(
        (w) =>
          w.language == selectedLanguage &&
          w.statistics != null &&
          w.statistics.timesEncountered < maxTimesEncountered
      ).length;

      if (availableWords < 8) {
        maxTimesEncountered++;
      }

      for (let i = 0; i < 8; i++) {
        var randomNumber = getRandomNumber(allWords.length - 1);

        while (
          usedIndices.includes(randomNumber) ||
          allWords[randomNumber].language != selectedLanguage ||
          allWords[randomNumber].statistics.timesEncountered >=
            maxTimesEncountered
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

        var translationCardContent: React.JSX.Element[] = [];
        var count = 0;
        for (let translation of currentWord.translations) {
          translationCardContent.push(
            <div key={translation.text} className="translation">
              {translation.text}
            </div>
          );

          // Only allow up to 6 translations on each translation card
          count++;
          if (count == 6) {
            break;
          }
        }

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
    var randomizedCards: any = [];
    var usedIndices: number[] = [];

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

        // This gets us the first translation word (as they can be many), as reference to check if it is a right translation of the parent word
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
    var cardsToDisplay: any = [];
    for (let i = 0; i < 16; i++) {
      cardsToDisplay.push(
        flippedCardGridIndices.includes(i) ? cards[i] : faceDownCards[i]
      );
    }

    return cardsToDisplay;
  }

  async function postGameStatistics(data = {}) {
    const response = await fetch(
      props.backendIPAddress + "/memoryGameStatistics",
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
    <div>
      <div className="menu-btn-memory">
        <img
          src="./src\assets\interface\button_menu_2.png"
          onClick={() => props.setScreen("mainMenu")}
        />
      </div>

      <div
        className="game-memory-container"
        style={{ zoom: props.smallScreen ? "85%" : "100%" }}
      >
        {flippedCardGridIndices.length === 16 && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}

        <div className="german-container">
          <img
            src="./src\assets\memory\germany_flag.webp"
            className="flag-ger"
            style={
              selectedLanguage == "German"
                ? { filter: "drop-shadow(0 0 2em #61dafbaa)" }
                : {}
            }
            onClick={() => {
              newGame("German");
            }}
          />
          <div className="prev-games-grid">{prevGermanGamesDetails}</div>
        </div>

        <div>
          <h3 className="mismatch-counter">Mismatches: {mismatchCounter}</h3>
          <div className="game-memory-grid">{displayCards()}</div>
        </div>

        <div className="greek-container">
          <img
            src="./src\assets\memory\greece_flag.png"
            className="flag-gr"
            style={
              selectedLanguage == "Greek"
                ? { filter: "drop-shadow(0 0 2em #61dafbaa)" }
                : {}
            }
            onClick={() => {
              newGame("Greek");
            }}
          />
          <div className="prev-games-grid">{prevGreekGamesDetails}</div>
        </div>
      </div>
    </div>
  );
}
