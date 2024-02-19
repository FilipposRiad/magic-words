import React from "react";

export default function Character(props) {
  const [characterImageIndex, setCharacterImageIndex] = React.useState(0);

  var characterImages;
  switch (props.name) {
    case "irmgard":
      characterImages = import.meta.glob("../assets/wizards/irmgard/*");
      break;
    case "ozok":
      characterImages = import.meta.glob("../assets/wizards/ozok/*");
      break;
    case "tilda":
      characterImages = import.meta.glob("../assets/wizards/tilda/*");
      break;
    case "werner":
      characterImages = import.meta.glob("../assets/wizards/werner/*");
      break;
    case "roasted_pig":
      characterImages = import.meta.glob("../assets/monsters/roasted_pig/*");
      break;
  }

  const imageFileNames = Object.keys(characterImages).map((path) => {
    return path.replace(".", "");
  });

  React.useEffect(() => {
    const imageUpdateInterval = setInterval(() => {
      setCharacterImageIndex((prev) =>
        prev === imageFileNames.length - 1 ? 0 : prev + 1
      );
    }, 1000);

    return () => {
      clearInterval(imageUpdateInterval);
    };
  }, []);

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
      src={"./src/" + imageFileNames[characterImageIndex]}
      style={props.style}
    />
  );
}
