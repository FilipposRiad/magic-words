import React from "react";

export default function Character(props) {
  const [characterImageIndex, setCharacterImageIndex] = React.useState(0);

  const characterImages = fetchCharacterImages(props.name);
  function fetchCharacterImages(characterName) {
    switch (characterName) {
      case "irmgard":
        return Object.keys(import.meta.glob("../assets/wizards/irmgard/*")).map(
          (path) => {
            return path.replace(".", "");
          }
        );
        break;
      case "ozok":
        return Object.keys(import.meta.glob("../assets/wizards/ozok/*")).map(
          (path) => {
            return path.replace(".", "");
          }
        );
        break;
      case "tilda":
        return Object.keys(import.meta.glob("../assets/wizards/tilda/*")).map(
          (path) => {
            return path.replace(".", "");
          }
        );
        break;
      case "werner":
        return Object.keys(import.meta.glob("../assets/wizards/werner/*")).map(
          (path) => {
            return path.replace(".", "");
          }
        );
        break;
      case "raagz":
        return Object.keys(import.meta.glob("../assets/wizards/raagz/*")).map(
          (path) => {
            return path.replace(".", "");
          }
        );
        break;
      case "roasted_pig":
        return Object.keys(
          import.meta.glob("../assets/monsters/roasted_pig/*")
        ).map((path) => {
          return path.replace(".", "");
        });
        break;
    }
  }

  React.useEffect(() => {
    const imageUpdateInterval = setInterval(() => {
      setCharacterImageIndex((prev) =>
        prev === characterImages.length - 1 ? 0 : prev + 1
      );
    }, 500);

    return () => {
      clearInterval(imageUpdateInterval);
      setCharacterImageIndex(0);
    };
  }, [props.name]);

  // function getRandomCharacterImage() {
  //   const randomImageIndex = Math.round(
  //     Math.random() * (imageFileNames.length - 1)
  //   );

  //   if (imageFileNames[randomImageIndex] == characterImage) {
  //     getRandomCharacterImage();
  //   } else {
  //     setCharacterImage(imageFileNames[randomImageIndex]);
  //   }
  // }

  return (
    <img
      src={"./src/" + characterImages[characterImageIndex]}
      style={props.style}
    />
  );
}
