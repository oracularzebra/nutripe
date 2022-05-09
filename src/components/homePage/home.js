import "./home.css";
import React from "react";

const Main = () => {
  return (
    <div className="mainPage">
      <div className="selectedImages"></div>
      <div className="menu">
        <button id="favouritesButton">Favourites</button>
        <button id="likedButton">Liked</button>
        <button id="watchLaterButton">Watch Later</button>
      </div>
    </div>
  );
};
export default Main;
