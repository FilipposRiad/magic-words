import React from "react";
import "./Library.css";

export default function Library(props) {
  return (
    <div className="library-container">
      <div className="menu-btn-lib">
        <img
          src="./src\assets\interface\button_menu_2.png"
          onClick={() => props.setScreen("mainMenu")}
        />
      </div>
      <div className="bookshelf">
        <img src="./src\assets\library/book_blue.png" className="book" />
        <img src="./src\assets\library/book_blue.png" className="book" />
        <img src="./src\assets\library/book_blue.png" className="book" />
        <img src="./src\assets\library/book_blue.png" className="book" />
        <img src="./src\assets\library/book_blue.png" className="book" />
        <img src="./src\assets\library/book_blue.png" className="book" />
        <img src="./src\assets\library/book_blue.png" className="book" />
      </div>
    </div>
  );
}
