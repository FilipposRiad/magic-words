import React from "react";

export default function Character(props) {
  const [characterImage, setCharacterImage] = React.useState("");

  var characterImages;
  switch (props.name) {
    case "irmgard":
      characterImages = import.meta.glob("./assets/wizards/irmgard/*");
      break;
    case "ozok":
      characterImages = import.meta.glob("./assets/wizards/ozok/*");
      break;
    case "tilda":
      characterImages = import.meta.glob("./assets/wizards/tilda/*");
      break;
    case "werner":
      characterImages = import.meta.glob("./assets/wizards/werner/*");
      break;
    case "roasted_pig":
      characterImages = import.meta.glob("./assets/monsters/roasted_pig/*");
      break;
  }

  //   // Extract the file names
  //   const imageFileNames = Object.keys(characterImages).map((path) => {
  //     // Split the path using forward slashes or backslashes (platform-independent)
  //     const parts = path.split(/[\\/]/);
  //     // Get the last part (file name)
  //     return parts[parts.length - 1];
  //   });

  const imageFileNames = Object.keys(characterImages).map((path) => {
    return path.replace(".", "");
  });

  console.log(imageFileNames);

  function getRandomCharacterImage() {
    const randomImageIndex = Math.round(
      Math.random() * (imageFileNames.length - 1)
    );

    console.log("GOT RANDOM IMAGE: " + randomImageIndex);

    console.log(imageFileNames[randomImageIndex]);

    if (imageFileNames[randomImageIndex] == characterImage) {
      getRandomCharacterImage();
    } else {
      setCharacterImage(imageFileNames[randomImageIndex]);
    }
  }

  return (
    // <img
    //   src={`./src/assets/wizards/${props.name}/${
    //     characterImage ? characterImage : imageFileNames[0]
    //   }`}
    //   onClick={getRandomCharacterImage}
    // />
    <img
      src={"./src/" + (characterImage ? characterImage : imageFileNames[0])}
      onClick={getRandomCharacterImage}
    />
  );
}
