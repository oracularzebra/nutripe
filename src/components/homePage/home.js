import "./home.css";
import React from "react";
import { useNavigate } from "react-router";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className="mainPage">
      <div className="selectedImages"></div>
      <div className="menu">
        <button id="favouritesButton" onClick={()=>navigate('favorites')}>Favourites</button>
        <button id="likedButton">Liked</button>
        <button id="watchLaterButton">Watch Later</button>
      </div>
    </div>
  );
};
export default Main;
